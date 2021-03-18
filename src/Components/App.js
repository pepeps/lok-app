import React from 'react';
import { Container } from 'react-bootstrap';
import { AuthProvider } from '../Context/AuthContext';
import { UserProvider } from '../Context/UserContext';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

import Dashboard from './Dashboard';
import Login from './Login';
import Album from './Album';
import NavigationBar from './NavigationBar';
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Switch>
          <React.Fragment>
            <NavigationBar />
            <UserProvider>
              <ProtectedRoute exact path='/' component={Dashboard} />
              <ProtectedRoute path='/album' component={Album} />
            </UserProvider>
            <Container className='d-flex align-items-center justify-content-center h100'>
              <div className='w-100 my-5 ' style={{ maxWidth: '400px' }}>
                <Route exact path='/login' component={Login} />
              </div>
            </Container>
          </React.Fragment>
        </Switch>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
