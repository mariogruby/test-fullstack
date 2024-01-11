/* eslint-disable */
import React, { useState, useEffect } from 'react';
import './navbar.css';
import { useContext } from 'react'
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../services/api.service'
import Cart from '../Cart/cart';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
// import 'bootstrap/dist/css/bootstrap.min.css';


const Navbar = ({ handleSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = (event) => {
    const query = event.target.value;
    setSearchQuery(event.target.value);
    handleSearch(query);
  };
  const { logOutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  function logOutHandler() {
    logOutUser()
    console.log(logOutUser, "user logged out")
    navigate("/");


  }

  //   const handleSubmit = (event) => {
  //     event.preventDefault();
  //     handleSearch(searchQuery);
  //   };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">SnowWorld</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="nav nav-underline">
            <li className="nav-item">
              <a className="nav-link text-dark" aria-current="page" href="/">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-dark" href="#">About us</a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle text-dark" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <PersonOutlineOutlinedIcon sx={{ fontSize: 28 }} />
              </a>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to="/Signup">Signup</Link></li>
                <li><Link className="dropdown-item" to="/Login">Login</Link></li>
                <li><hr className="dropdown-divider"></hr></li>
                <li><a className="dropdown-item" onClick={logOutHandler}>Log Out</a></li>
              </ul>
            </li>
            <Cart/>

            {/* <li className="nav-item">
              <a className="nav-link disabled" aria-disabled="true">Disabled</a>
            </li> */}
          </ul>
          {/* <div className="search-box"> */}
          <a href="#" className="text-dark ms-auto pe-auto" data-bs-toggle="collapse" data-bs-target="#collapseWidthExample" aria-expanded="false" aria-controls="collapseWidthExample"><SearchIcon className="mt-2" /></a>
          <div className="input-style">
            <div class="collapse collapse-horizontal" id="collapseWidthExample">
              <div className="form-group">
                <form className="d-flex ms-auto" role="search">
                  <input className="form-control me-2" type="text " placeholder="Search..." aria-label="Search" value={searchQuery}
                    onChange={handleChange} />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

{/* <form className="d-flex" role="search">
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Buscar productos..."
            aria-label="Search"
            value={searchQuery}
            onChange={handleChange}
          />
          <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Buscar</button>
        </form> */}


{/*   <div className= "dropdown">
      <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    carrito
  </button>
        <ul className="dropdown-menu">
          {cartProducts.map((cartProduct) => (
            <li key={cartProduct.id}>

              Producto ID: {cartProduct.productId} - Cantidad: {cartProduct.quantity} - title: {cartProduct.title} -price:{cartProduct.price}
            </li>
          ))}
        </ul>
      </div> */}


    //   <div class="box ms-auto">
    //   <form className="search">
    //     <input type="text" className="input" name="txt" value={searchQuery}
    //       onChange={handleChange} onmouseout="this.value = ''; this.blur();"/>
    //       <i><SearchIcon/></i>
    //   </form>
    // </div>