import React, { useState, useEffect } from 'react';
import ApiService from '../../services/api.service';
import { useCart } from '../../context/cart.context';
import './styles.css';

const ShowProductById = () => {
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productId = 8242953879830;
        const fetchedProduct = await ApiService.fetchProductById(productId);

        setProduct(fetchedProduct);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error.message);
        setLoading(false);
      }
    };

    fetchProduct();
  }, []);

  const addToCartHandler = async (productId, title, price, image) => {
    try {
      await ApiService.addToCart(productId, title, price, image);
      addToCart({ id: productId, title, price, image });
      console.log('Producto agregado al carrito exitosamente');
    } catch (error) {
      console.error('Error al agregar producto al carrito:', error);
    }
  };

    return (
      <div className="padre">
        {loading ? (
          <p>Cargando...</p>
        ) : (
          <section className="container py-5" id="color-div">
            <div className="container px-4 px-lg-5">
              <div className="row gx-4 gx-lg-5 align-items-center">
                <div className="col-md-6 text-start"> 
                {/* Add text-start class here */}
                {product.image ? (
                  <img
                    className="card-img-top mb-5 mb-md-0"
                    src={product.image.src}
                    alt={product.title}
                  />
                ) : (
                  <div>No hay imagen disponible</div>
                )}
                </div>
                <div className="col-md-6 text-start"> {/* Add text-start class here */}
                  <small className="mb-1">OUR SIGNATURE TOP BOARD </small>
                  <h1 className="display-5 fw-bolder">{product.title}</h1>
                  <div className="fs-5 mb-5">
                    <span className="text-decoration-line-through">$900.00</span>
                    <span> ${product.variants[0].price}</span>
                    <div></div>
                    <small className="mb-1 taxes">Tax included. Shipping calculated at checkout.</small>
                  </div>
                  <p className="lead">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium at dolorem quidem modi.
                    Nam sequi consequatur obcaecati excepturi alias magni, accusamus eius blanditiis delectus ipsam
                    minima ea iste laborum vero?
                  </p>
                  <div className="d-flex">
                    <input
                      id="inputQuantity"
                      className="form-control text-center me-3"
                      type="number"
                      value="1"
                      style={{ maxWidth: '3rem' }}
                    />
                    <button className="btn btn-outline-dark flex-shrink-0" type="button"
                    onClick={()=>addToCartHandler(product.id, product.title, product.variants[0].price, product.image.src)}>
                      <i className="bi bi-cart-fill me-1" />
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    );
  }


export default ShowProductById;
