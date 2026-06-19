import React, { createContext, useState, useEffect } from 'react';
import { loginUser, registerUser } from '../services/api';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    try {
      const response = await loginUser(email, password);
      if (response.success) {
        setUser(response.user);
        localStorage.setItem('user', JSON.stringify(response.user));
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const register = async (name, email, password) => {
    try {
      const response = await registerUser(name, email, password);
      if (response.success) {
        setUser(response.user); // queda logueado despues de registrarse
        localStorage.setItem('user', JSON.stringify(response.user));
        return true;
      }
      return false;
    } catch (error) {
      console.error("Registration failed:", error);
      return false;
    }
  };

  useEffect(() => {
    // revisa si hay una sesion guardada al cargar la app
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, login, logout, register }}>
      {children}
    </UserContext.Provider>
  );
};