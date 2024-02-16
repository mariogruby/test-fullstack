import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

// exportamos el provider del contexto
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [updateCart, setUpdateCart] = useState(0); // Nuevo estado para forzar la actualización del componente

  // Funcion para agregar al contexto productos al carrito
  const addToCart = (item) => {
    setCartItems((prevCartItems) => [...prevCartItems, item]);
    setUpdateCart((prev) => prev + 1); // Incrementar el estado para forzar la actualización
  };
  // Funcion para limpiar el carrito despues de hacer la comprobacion de isLoggedIn de authContext,
  // si no esta logeado o hace log Out, limpia el contexto del carrito 
  const clearCart = () => {
    setCartItems([]);
    setUpdateCart((prev) => prev + 1); // Incrementar el estado para forzar la actualización
  };
// funcion para mostrar el contexto de todos los items que hay en el carrito
  const getCartItems = () => {
    return cartItems;
  };

  return (
    // le damos al provider del contexto del carrito los valores de cada funcion
    <CartContext.Provider value={{ addToCart, getCartItems, updateCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
// exportamos el contexto 
export const useCart = () => {
  return useContext(CartContext);
};
