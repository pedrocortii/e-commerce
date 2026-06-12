import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addProduct = (product, quantity) => {
    setCart((prevCart) => {
      const existingProductIndex = prevCart.findIndex(item => item.product.id === product.id);
      if (existingProductIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingProductIndex].quantity += quantity;
        return newCart;
      } else {
        return [...prevCart, { product, quantity }];
      }
    });
  };

  const eliminateProduct = (productId) => {
    setCart((prevCart) => prevCart.filter(item => item.product.id !== productId));
  };

  const emptyCart = () => {
    setCart([]);
  };

  const total = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addProduct, eliminateProduct, emptyCart, total }}>
      {children}
    </CartContext.Provider>
  );
};
