import axios from 'axios';
import React, { useContext, useState } from 'react';

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  function login(email, password) {
    return axios
      .post('https://reqres.in/api/login', { email, password })
      .then((response) => response)
      .then(({ data }) => {
        if (data) {
          setToken(true);
          setLoading(loading);
          setIsAuthenticated(true);
        }
      })
      .catch((err) => err);
  }

  function logout() {
    setToken(false);
    setLoading(false);
    setIsAuthenticated(false);
  }

  const value = {
    token,
    login,
    logout,
    isAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
