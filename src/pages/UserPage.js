import Body from '../components/Body';
import { useParams } from 'react-router-dom';
import Image from 'react-bootstrap/Image'
import Spinner from 'react-bootstrap/Spinner';
import TimeAgo from '../components/TimeAgo'
import Stack from 'react-bootstrap/Stack';
import  { useApi } from '../contexts/ApiProvider'
import { useUser } from '../contexts/UserProvider';
import { useEffect, useState, useNavigate } from 'react';
import Posts from '../components/Posts';
import Button from 'react-bootstrap/Button'

export default function UserPage() {
  const [user, setUser] = useState();
  const [isFollower, setIsFollower] = useState();
  const { username } = useParams();
  const {user: loggedInUser} = useUser();
  const navigate = useNavigate();
  const api = useApi();
  
  useEffect(() => {
    (async() => {
      const response = await api.get('/users/' + username);
      if (response.ok) {
        setUser(response.body);
        if (response.body.username !== loggedInUser.username){
          const follower = await api.get('/me/following/' + response.body.id);
          if (follower.status === 204) {
            setIsFollower(true);
          }
          else if (follower.status === 404) {
            setIsFollower(false);
          }
        }
        else {
          setIsFollower(null);
        }
      } 
      else {
        setUser(null);
      }
    })()
  } , [api, username, loggedInUser]);

  const edit = () => {
    navigate('/edit')
  }

  const follow = async () => {
    //TODO
  }

  const unfollow = async () => {
    //TODO
  }

  return (
    <Body sidebar>
      { user === undefined ?
        <Spinner border="animation"/>
      :
        <>
          { user === null ? 
            <p>User not found.</p>
          :  
          <>
            <Stack direction="horizontal" gap={4}>
              <Image src="{user.avatar_url}" roundedCircle />
              <div>
                <h1>{ user.username }</h1>
                <p>
                  Member since: <TimeAgo isoDate={user.first_seen} />
                  <br />
                  Last seen: <TimeAgo isoDate={user.last_seen} />
                </p>
                {isFollower === null &&
                  <Button vraint="primary" onClick={edit}>Edit</Button>
                }
                {isFollower === false &&
                  <Button vraint="primary" onClick={follow}>Follow</Button>
                }
                {isFollower === true &&
                  <Button vraint="primary" onClick={unfollow}>Follow</Button>
                }
              </div>
            </Stack>
            <Posts content={user.id}/>
          </>
          }
        </>}
    </Body>
  );
}
