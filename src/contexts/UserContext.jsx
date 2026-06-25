import React, { createContext, useState, useEffect } from "react";
import { loginUser, registerUser } from "../services/api";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    const result = await loginUser(email, password);
    if (result.success) {
      setUser(result.user);
      localStorage.setItem("user", JSON.stringify(result.user));
    }
    return result;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const register = async (name, email, password) => {
    const result = await registerUser(name, email, password);
    if (result.success) {
      setUser(result.user); // queda logueado despues de registrarse
      localStorage.setItem("user", JSON.stringify(result.user));
    }
    return result;
  };

  useEffect(() => {
    // revisa si hay una sesion guardada al cargar la app
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  return (
    <UserContext.Provider value={{ user, login, logout, register }}>
      {children}
    </UserContext.Provider>
  );
};
