import Spinner from 'react-bootstrap/Spinner'
import { useEffect, useState } from 'react';
import Post from './Post'
import { useApi } from '../contexts/ApiProvider';

export default function Posts() {

    const [posts, setPosts] = useState()
    const api = useApi()

    useEffect(() => {
        (async () => {
            let response = await api.get('/feed');
            if (response.ok) {
                setPosts(response.body.data)
            } else {
                setPosts(null)
            }
        })();
    }, [api])

    return (
        <>
            { posts === undefined ?
             < Spinner border="animation" /> 
             :
                <>
                    {posts.length === null ? 
                        <p>Could not load blog posts.</p> 
                    :
                        posts.map(post => <Post key={ post.id } post={ post }/>)
                    }
                </>
            }
        </>
    );
}
