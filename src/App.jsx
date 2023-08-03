import './App.css';
import { useState, useEffect } from 'react';
import axios from './utils';

const AxiosExample = () => {
  const [ users, setUsers ] = useState([]);
  const [ post, setPost ] = useState({});
  const [ lastPost, setLastPost ] = useState({});

  useEffect(() => {
    const getUsers = async() => {
      const result = await axios.get('/users');
      setUsers(result.data);
    }
    getUsers();

    const getLastPost = async() => {
      const { data } = await axios.get('/posts');
      const result = data[data.length - 1];
      setLastPost(result);
    }
    getLastPost();
  },[]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPost({ ...post, [name]:value });
  }

  const handleSubmit = async(event) => {
    event.preventDefault();
    const { data, status } = await axios.post('/posts',post);
    if (status === 201) {
      setLastPost(data);
    }
  }

  return (
    <div>
      <h1>Axios</h1>
      <h2>Users: example of &quot;get&quot; with axios </h2>
      {
        users.map((user) => {
          return (
            <p key={user.id}>{user.name} ({user.username})</p>
          )
        })
      }
      <h2>Posts: example of &quot;post&quot; with axios</h2>
      <form onSubmit={handleSubmit} action="">
        <label htmlFor="title">Title:</label><br />
        <input type="text" name="title" onChange={handleChange} id="title" /><br />
        <label htmlFor="body">Body:</label><br />
        <textarea name="body" onChange={handleChange} id="body" cols="30" rows="10"></textarea><br />
        <button type="submit">Post</button>
      </form>
      <h3>Last post of the API:</h3>
      <h4>{lastPost.title}</h4>
      <p>{lastPost.body}</p>
    </div>
  )
}

export default AxiosExample;
