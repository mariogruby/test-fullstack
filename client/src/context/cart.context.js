import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [updateCart, setUpdateCart] = useState(0); // Nuevo estado para forzar la actualización del componente

  const addToCart = (item) => {
    setCartItems((prevCartItems) => [...prevCartItems, item]);
    setUpdateCart((prev) => prev + 1); // Incrementar el estado para forzar la actualización
  };

  const getCartItems = () => {
    return cartItems;
  };

  return (
    <CartContext.Provider value={{ addToCart, getCartItems, updateCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
