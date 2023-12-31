import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ApiService from '../services/api.service'

// Función para obtener el precio más bajo de los variantes del producto
// const getLowestPrice = (variants) => {
//     let lowestPrice = Infinity;
//     variants.forEach((variant) => {
//         if (variant.price < lowestPrice) {
//             lowestPrice = variant.price;
//         }
//     });
//     return lowestPrice !== Infinity ? lowestPrice : 'No disponible';
// };

const CollectionPage = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
          try {
            const productsData = await ApiService.fetchProducts();
            setProducts(productsData);
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchProducts();
      }, []);

    return (
        <div className="container">
            <h1>Productos</h1>
            <div className="row">
                {products.map((product) => (
                    <div key={product.id} className="col-md-4">
                        <div className="product-card">
                            {product.image ? (
                                <img src={product.image.src} alt={product.title} style={{ maxWidth: '200px', maxHeight: '200px' }} /> // Verificar si product.image existe antes de acceder a product.image.src
                            ) : (
                                <div>No hay imagen disponible</div>
                            )}
                            <h3>{product.title}</h3>
                            <p>Precio: {`$${product.variants[0].price}`}</p>
                            <Link to={`/products/${product.id}`}>Ver Detalles</Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CollectionPage;