import React, { useState, useEffect } from 'react';
import { useUserRequest } from '../Context/UserContext';
import { Card, Button, Container, Toast } from 'react-bootstrap';

export default function Album() {
  const [albumsSideBar, setAlbumsSideBar] = useState(false);
  const { data, getUsers, getAlbums, albums, deleteAlbum } = useUserRequest();

  useEffect(() => {
    getUsers();
  }, []);

  const handlerSidebarIsOpen = async (id) => {
    if (!albumsSideBar) {
      await setAlbumsSideBar(true);
      getAlbums(id);
    } else {
      setAlbumsSideBar(false);
    }
  };

  const AlbumsSidebar = () => (
    <div className={albumsSideBar ? 'sideBar' : 'sideBarHide'}>
      <Button onClick={handlerSidebarIsOpen}>Close</Button>
      {albums.map((post) => (
        <Toast key={post.id} onClose={() => deleteAlbum(post.id)}>
          <Toast.Header>
            <strong className='mr-auto'>{post.title}</strong>
            <small>Delete</small>
          </Toast.Header>
          <Toast.Body>{post.body}</Toast.Body>
        </Toast>
      ))}
    </div>
  );
  return (
    <div className='album'>
      <AlbumsSidebar />
      <Container className='users-container'>
        {data.map((user) => (
          <Card key={user.id} className='card'>
            <Card.Img variant='top' src={user.avatar} className='card__img' />
            <Card.Body className='card__body'>
              <Card.Title>{user.email}</Card.Title>
              <Card.Text>{`${user.first_name} ${user.last_name}`}</Card.Text>
              {user.updatedAt ? (
                <Card.Text>Updated At : {user.updatedAt}</Card.Text>
              ) : null}
            </Card.Body>
            <Button type='button' onClick={() => handlerSidebarIsOpen(user.id)}>
              Show Albums
            </Button>
          </Card>
        ))}
      </Container>
    </div>
  );
}
