import useSWR from 'swr';
import useSWRMutation from 'swr/mutation'
import { useState } from 'react';

const urlUsers = 'https://jsonplaceholder.typicode.com/users'
const urlPosts = 'https://jsonplaceholder.typicode.com/posts'

const fetcher = (...args) => fetch(...args).then((response) => response.json());

const sendRequest = async(url,{ ...args }) => {
    const config = {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(args)
    }

    const response = await fetch(url,config);
    const data = await response.json();
    return data;
}

const SWRExample = () => {
    const [ post, setPost ] = useState({});
    const { data, isLoading} = useSWR(urlUsers, fetcher);
    const { trigger, isMutating, error } = useSWRMutation(urlPosts,sendRequest);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setPost({ ...post, [name]:value });
    }

    const handleSubmit = async(event) => {
        event.preventDefault();
        await trigger(post);
        if (error === undefined) alert('Post succesful')
    }

    if (isLoading) return <p>Loading...</p>
    if (isMutating) return <p>Adding post...</p>

    return (
        <div>
            <h1>SWR</h1>
            <h2>SWR &apos;get&apos; example</h2>
            {
                data.map((user) => {
                    return (
                    <div key={user.id}>
                        <h3>{user.name}</h3>
                        <p>{user.email}</p>
                    </div>
                )})
            }
            <h2>SWR &apos;post&apos; example</h2>
            <form onSubmit={handleSubmit} action="">
                <label htmlFor="title">Title:</label><br />
                <input type="text" name="title" onChange={handleChange} id="title" /><br />
                <label htmlFor="body">Body:</label><br />
                <textarea name="body" onChange={handleChange} id="body" cols="30" rows="10"></textarea><br />
                <button type="submit">Post</button>
            </form>
        </div>
    )
}

export default SWRExample;