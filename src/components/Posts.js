import Spinner from 'react-bootstrap/Spinner'
import { useEffect, useState } from 'react';
import Post from './Post'

const BASE_API_URL = process.env.REACT_APP_BASE_API_URL

export default function Posts() {

    const [posts, setPosts] = useState()

    useEffect(() => {
        (async () => {
            const response = await fetch(BASE_API_URL + '/api/feed');
            if (response.ok) {
                const results = await response.json()
                setPosts(results.data)
            } else {
                setPosts(null)
            }
        })();
    }, [])

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
