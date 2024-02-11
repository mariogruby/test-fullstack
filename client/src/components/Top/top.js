import { Link } from 'react-router-dom';
import ApiService from '../../services/api.service';
import './styles.css'


const addToCart = async (productId, title, price) => {
    try {
        await ApiService.addToCart(productId, title, price);
        console.log('Producto agregado al carrito exitosamente');
    } catch (error) {
        console.error('Error al agregar producto al carrito:', error);
    }
};

const ProductSection = () => {
    
    return (
        // <div className="bb-g container mt-5">
        <section className="container py-5">
        <div className="container px-4 px-lg-5 my-5">
          <div className="row gx-4 gx-lg-5 align-items-center">
            <div className="col-md-6 text-start"> {/* Add text-start class here */}
              <img
                className="card-img-top mb-5 mb-md-0"
                src="https://cdn.shopify.com/s/files/1/0756/0996/4822/products/Main.jpg?v=1683140446"
                alt="..."
              />
            </div>
            <div className="col-md-6 text-start"> {/* Add text-start class here */}
              <small className="mb-1">OUR SIGNATURE TOP BOARD </small>
              <h1 className="display-5 fw-bolder">The 3D Modeled Snowboard</h1>
              <div className="fs-5 mb-5">
                <span className="text-decoration-line-through">$900.00</span>
                <span> $885.95</span>
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
                <button className="btn btn-outline-dark flex-shrink-0" type="button">
                  <i className="bi bi-cart-fill me-1" />
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    //    </div>
      
    );
  };
  
  
  export default ProductSection;