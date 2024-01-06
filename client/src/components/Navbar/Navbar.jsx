import React, { useState } from 'react';
import { useContext } from 'react'
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';
import { useNavigate } from 'react-router-dom';


const Navbar = ({ handleSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

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
      </div>
    </nav>
  );
};

export default Navbar;
