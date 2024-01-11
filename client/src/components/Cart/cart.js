import React from "react";
import { useState, useEffect } from "react";
import ApiService from '../../services/api.service';
import Nav from 'react-bootstrap/Nav';
import Offcanvas from 'react-bootstrap/Offcanvas';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

const Cart = () => {

  const [cartProducts, setCartProducts] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

  return (
    <>
       <a href="#"><Nav.Item variant="primary" className="nav-link nav-underline text-dark" onClick={handleShow}>
        <ShoppingCartOutlinedIcon />
      </Nav.Item></a>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        <div className="">
      {cartProducts.map((cartProduct) => (
        <div key={cartProduct.id}>

          Producto ID: {cartProduct.productId} - Cantidad: {cartProduct.quantity} - title: {cartProduct.title} -price:{cartProduct.price}
        </div>
      ))}
    </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}

export default Cart;

{/* <button className="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop" aria-controls="offcanvasTop">Toggle top offcanvas</button>

<div className="offcanvas offcanvas-top" tabindex="-1" id="offcanvasTop" aria-labelledby="offcanvasTopLabel">
  <div className="offcanvas-header">
    <h5 className="offcanvas-title" id="offcanvasTopLabel">Offcanvas top</h5>
    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div className="offcanvas-body">
      {cartProducts.map((cartProduct) => (
        <div key={cartProduct.id}>

          Producto ID: {cartProduct.productId} - Cantidad: {cartProduct.quantity} - title: {cartProduct.title} -price:{cartProduct.price}
        </div>
      ))}
    </div>
</div> */}