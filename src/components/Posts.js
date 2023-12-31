import Spinner from 'react-bootstrap/Spinner'
import { useEffect, useState } from 'react';
import Post from './Post'
import { useApi } from '../contexts/ApiProvider';

export default function Posts({ content }) {

    const [posts, setPosts] = useState()
    const api = useApi()

    let url;
    switch(content) {
        case 'feed':
        case 'undefined':
            url = '/feed';
            break;
        case 'explore':
            url = '/posts'
            break;
        default: 
            url = `/users/${content}/posts`;
            break;
    }

    useEffect(() => {
        (async () => {
            const response = await api.get(url);
            if (response.ok) {
                setPosts(response.body.data)
            } else {
                setPosts(null)
            }
        })();
    }, [api, url])

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
