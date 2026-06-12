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
  };

  const register = async (name, email, password) => {
    try {
      const response = await registerUser(name, email, password);
      if (response.success) {
        setUser(response.user); // Log in the user after successful registration
        return true;
      }
      return false;
    } catch (error) {
      console.error("Registration failed:", error);
      return false;
    }
  };

  useEffect(() => {
    // Check for user session in localStorage or similar on mount
    // For now, no persistent login is implemented as per instructions.
  }, []);

  return (
    <UserContext.Provider value={{ user, login, logout, register }}>
      {children}
    </UserContext.Provider>
  );
};
