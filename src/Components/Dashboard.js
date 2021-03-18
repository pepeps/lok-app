import React, { useState, useEffect, useRef } from 'react';
import { useUserRequest } from '../Context/UserContext';
// import Sidebar from './Sidebar';
import { Container, Card, Button, Form, Toast } from 'react-bootstrap';

export default function Dashboard() {
  const emailRef = useRef();
  const avatarImgRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const idRef = useRef();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const {
    data,
    getUsers,
    updateUserById,
    getPostsByUserId,
    posts,
    getUserById,
    user,
    deletePost,
  } = useUserRequest();

  useEffect(() => {
    getUsers();
  }, []);

  async function updateUser(e) {
    e.preventDefault();
    await updateUserById({
      email: emailRef.current.value,
      first_name: firstNameRef.current.value,
      last_name: lastNameRef.current.value,
      avatar: avatarImgRef.current.value,
      id: idRef.current.value,
    });
    setSidebarOpen(false);
  }

  const Sidebar = () => {
    return (
      <div className={sidebarOpen ? 'sideBard' : 'sideBardHide'}>
        <Button onClick={handlerSidebarIsOpen}>Close</Button>
        {user ? (
          <Form onSubmit={updateUser}>
            <Form.Group>
              <Form.Control
                type='hidden'
                defaultValue={user.id}
                ref={idRef}></Form.Control>
            </Form.Group>
            <Form.Group id='avatar'>
              <Form.Label>AvatarImg</Form.Label>
              <Form.Control
                type='text'
                ref={avatarImgRef}
                defaultValue={user.avatar}
                required
              />
            </Form.Group>
            <Form.Group id='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='email'
                ref={emailRef}
                defaultValue={user.email}
                required
              />
            </Form.Group>
            <Form.Group id='first_name'>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type='text'
                ref={firstNameRef}
                defaultValue={user.first_name}
                required
              />
            </Form.Group>
            <Form.Group id='last_name'>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type='text'
                ref={lastNameRef}
                defaultValue={user.last_name}
                required
              />
            </Form.Group>
            <Button type='submit'>Update User</Button>
            <Button type='button' onClick={() => getPostsByUserId(user.id)}>
              Show Posts
            </Button>
          </Form>
        ) : (
          <p>User not Founded</p>
        )}
        <div>
          <h2>Posts</h2>
          {posts.map((post) => (
            <Toast key={post.id} onClick={() => deletePost(post.id)}>
              <Toast.Header>
                <strong className='mr-auto'>{post.title}</strong>
                <small>Delete</small>
              </Toast.Header>
              <Toast.Body>{post.body}</Toast.Body>
            </Toast>
          ))}
        </div>
      </div>
    );
  };

  const handlerSidebarIsOpen = async (user) => {
    if (!sidebarOpen) {
      setSidebarOpen(true);
      console.log(user);
      await getUserById(user.id);
    } else {
      setSidebarOpen(false);
      // setUser({});
      // setPostArray([]);
    }
  };

  return (
    <React.Fragment>
      <div className='dashboard'>
        <Sidebar />
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
              <Button type='button' onClick={() => handlerSidebarIsOpen(user)}>
                Show User & Posts
              </Button>
            </Card>
          ))}
        </Container>
      </div>
    </React.Fragment>
  );
}
