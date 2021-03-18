import React, { useState } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

import { useAuth } from '../Context/AuthContext';
import { useHistory } from 'react-router-dom';

export default function NavigationBar() {
  const [error, setError] = useState('');
  const { isAuthenticated, logout } = useAuth();
  const history = useHistory();

  async function handleLogout() {
    try {
      setError(error);
      await logout();
      history.push('/login');
    } catch {
      setError('Failed to log out');
    }
  }

  return (
    <Navbar bg='light' expand='md'>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse>
        {isAuthenticated ? (
          <Nav className='menu'>
            <NavLink to='/'>Users</NavLink>
            <NavLink to='/album'>Album</NavLink>
          </Nav>
        ) : (
          <></>
        )}
        <Nav className='ml-auto'>
          <Button onClick={handleLogout}>Log Out</Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
