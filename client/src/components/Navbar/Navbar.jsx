import React, { useState, useEffect } from 'react';
import { useContext } from 'react'
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../services/api.service'


const Navbar = ({ handleSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [cartProducts, setCartProducts] = useState([]);

  const handleChange = (event) => {
    const query = event.target.value;
    setSearchQuery(event.target.value);
    handleSearch(query);
  };
  const { logOutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  function logOutHandler(){
    logOutUser()
    console.log(logOutUser, "user logged out")
    navigate("/");
  }
  useEffect(() => {
    const fetchCartProducts = async () => {
      try {
        const cartProductsData = await ApiService.getCartProducts();
        setCartProducts(cartProductsData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCartProducts();
  }, []);

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     handleSearch(searchQuery);
//   };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
         <div class="container-fluid">
      <button onClick={logOutHandler}>Log Out</button>
      <Link to="/signup">signup</Link>
      <Link to="/login">Login</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/">Inicio</Link>
          </li>
          {/* Agrega más elementos del navbar aquí */}
        </ul>
        <form className="d-flex" role="search">
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Buscar productos..."
            aria-label="Search"
            value={searchQuery}
            onChange={handleChange}
          />
          <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Buscar</button>
        </form>
        
      </div>
      <div class= "dropdown">
      <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    carrito
  </button>
        <ul class="dropdown-menu">
          {cartProducts.map((cartProduct) => (
            <li key={cartProduct.id}>
              {/* Puedes mostrar detalles del producto del carrito */}
              Producto ID: {cartProduct.productId} - Cantidad: {cartProduct.quantity} - title: {cartProduct.title} -price:{cartProduct.price}
            </li>
          ))}
        </ul>
      </div>
      </div>
    </nav>
  );
};

export default Navbar;
