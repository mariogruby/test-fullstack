import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/cart.context'; 
import BootsService from '../../services/boots.service';

const Boots = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchBoots = async () => {
            try {
                const productsData = await BootsService.fetchBoots();
                setProducts(productsData);
            } catch (error) {
                console.error(error);
            }
        };
        fetchBoots();
    }, [])

  // explicacion de funcionalidad en api-collecitons.jsx
      const { addToCart } = useCart();
      const addToCartHandler = async (productId, title, price, image) => {
        try {
          await BootsService.addToCart(productId, title, price, image);
          addToCart({ id: productId, title, price, image }); 

          console.log('Producto agregado al carrito exitosamente');
        } catch (error) {
          console.error('Error al agregar producto al carrito:', error);
        }
      };
      
      return( 
        <>
        <h1>boots</h1>
        <div className="row">
        {products.map((product) => (
          <div key={product.id} className='col-md-4'>
            <div className="product-card">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.title}
                  style={{ maxWidth: '200px', maxHeight: '200px' }}
                />
              ) : (
                <div>No hay imagen disponible</div>
              )}
              <h3>{product.title}</h3>
              <p>Precio: {`$${product.price}`}</p>
              <Link to={`/products/boots/${product.id}`}>Ver Detalles</Link>
              <button onClick={() => addToCartHandler(product.id, product.title, product.price, product.image)}>Agregar al Carrito</button>
            </div>
          </div>
        ))}
      </div>
        </>
      );
}

export default Boots;