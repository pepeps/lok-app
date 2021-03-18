import axios from 'axios';
import React, { useContext, useState } from 'react';

const UserContext = React.createContext();

export function useUserRequest() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const [data, setData] = useState([]);
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [albums, setAlbums] = useState([]);

  async function getUsers() {
    try {
      const response = await axios.get('https://reqres.in/api/users');
      setData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function getUserById(id) {
    try {
      const userUpdated = data.find((user) => user.id === id);
      setUser(userUpdated);
    } catch (error) {
      console.log(error);
    }
  }

  async function updateUserById(userData) {
    const newData = [
      ...data.slice(0, userData.id - 1),
      userData,
      ...data.slice(userData.id - 1 + 1),
    ];
    setData(newData);
    setUser(userData);
  }

  async function getPostsByUserId(id) {
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts?userId=${id}`
      );
      setPosts(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function deletePost(id) {
    const newPosts = posts.filter((p) => p.id !== id);
    console.log(newPosts);
    setPosts(newPosts);
  }

  async function getAlbums(id) {
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/users/${id}/albums`
      );
      setAlbums(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteAlbum(id) {
    const newAlbum = albums.filter((a) => a.id !== id);
    setAlbums(newAlbum);
  }

  const value = {
    data,
    posts,
    albums,
    user,
    getUsers,
    updateUserById,
    getPostsByUserId,
    getAlbums,
    getUserById,
    deletePost,
    deleteAlbum,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
