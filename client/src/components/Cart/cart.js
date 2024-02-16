import React, { useState, useEffect, useContext } from "react";
import './cart-styles.css';
import Nav from 'react-bootstrap/Nav';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Image from 'react-bootstrap/Image';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Link } from "react-router-dom";
import { AuthContext } from '../../context/auth.context';
import { useCart } from '../../context/cart.context'
import ApiService from '../../services/api.service';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const Cart = () => {
  const [cartProducts, setCartProducts] = useState([]);
  const [show, setShow] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const { getCartItems, updateCart } = useCart();
  const { isLoggedIn } = useContext(AuthContext); // Obtener el estado updateCart del contexto

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const removeFromCart = async (productId) => {
    try {
      await ApiService.removeProductFromCart(productId);
      const updatedCartProducts = await ApiService.getCartProducts();
      setCartProducts(updatedCartProducts);

      const total = updatedCartProducts.reduce((acc, cartProduct) => acc + cartProduct.price * cartProduct.quantity, 0);
      setTotalPrice(total);
    } catch (error) {
      console.error('Error removing product from cart:', error);
    }
  };

  useEffect(() => {
    const fetchCartProducts = async () => {
      try {
        if (isLoggedIn) {
          const cartProductsData = await ApiService.getCartProducts();
          setCartProducts(cartProductsData);

          const total = cartProductsData.reduce((acc, cartProduct) => acc + cartProduct.price * cartProduct.quantity, 0);
          setTotalPrice(total);
        } else {
          // Si el usuario no está autenticado, establece el carrito como vacío
          setCartProducts([]);
          setTotalPrice(0);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchCartProducts();
  }, [updateCart, isLoggedIn]);

  return (
    <>
      <a href="#" onClick={handleShow} className="nav-link nav-underline text-dark">
        <Nav.Item variant="primary">
          <ShoppingCartOutlinedIcon />
        </Nav.Item>
      </a>
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <table className="table">
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">Product</th>
                <th scope="col">Quantity</th>
                <th scope="col">Price</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {cartProducts.map((cartProduct) => (
                <tr key={cartProduct.id}>
                  <td>
                    <Link to={`products/${cartProduct.productId}`}>
                      <Image src={cartProduct.image} className="product-image-cart" alt="Product Image" rounded />
                    </Link>
                  </td>
                  <td>
                    <Link to={`products/${cartProduct.productId}`}
                      className="link-dark link-offset-2 link-underline-opacity-0 link-underline-opacity-100-hover">
                      {cartProduct.title}
                    </Link>
                  </td>
                  <td className="">
                    <input type="number" class="form-control form-control text-center" value={cartProduct.quantity} />
                  </td>
                  <td>${(cartProduct.price * cartProduct.quantity).toFixed(2)}</td>
                  <td>
                    <DeleteForeverIcon onClick={() => removeFromCart(cartProduct.productId)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="position-absolute end-0 total-price">
            <strong>
              Subtotal
            </strong>
          </div>
          <p className="position-absolute end-0 total-price-texto">${totalPrice.toFixed(2)}</p>
          <div>
            <button className="position-absolute end-0 button-checkout">
              Checkout
            </button>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Cart;

{/* <Link to={`products/${cartProduct.productId}`}></Link> */ }
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