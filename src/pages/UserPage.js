import Body from '../components/Body';
import { useParams } from 'react-router-dom';
import Image from 'react-bootstrap/Image'
import Spinner from 'react-bootstrap/Spinner';
import TimeAgo from '../components/TimeAgo'
import Stack from 'react-bootstrap/Stack';
import  { useApi } from '../contexts/ApiProvider'
import { useEffect, useState } from 'react';
import Posts from '../components/Posts';

export default function UserPage() {
  
  const { username } = useParams();
  const [user, setUser] = useState();
  const api = useApi();
  
  useEffect(() => {
    (async() => {
      const response = await api.get('/users/' + username);
      setUser(response.ok ? response.body : null)
    })()
  } , [api, username]);

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
                    { console.log(`${user.first_seen}`) }
                    <Image src="{user.avatar_url}" roundedCircle />
                    <div>
                        <h1>{ user.username }</h1>
                        <p>
                          Member since: <TimeAgo isoDate={user.first_seen} />
                          <br />
                          Last seen: <TimeAgo isoDate={user.last_seen} />
                        </p>
                    </div>
                </Stack>
                <Posts content={user.id}/>
              </>
              }
          </>}
    </Body>
  );
}
