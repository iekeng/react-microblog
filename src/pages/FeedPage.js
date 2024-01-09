import Body from '../components/Body'
import Posts from '../components/Posts'
import { useUser } from '../contexts/UserProvider'

export default function FeedPage() {
  const { user } = useUser()
  console.log(user)
  return(
    <Body sidebar>
      <Posts write={true} content={user.id} />
    </Body>
  )
}