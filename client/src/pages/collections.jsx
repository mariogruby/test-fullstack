import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// Función para obtener el precio más bajo de los variantes del producto
const getLowestPrice = (variants) => {
    let lowestPrice = Infinity;
    variants.forEach((variant) => {
        if (variant.price < lowestPrice) {
            lowestPrice = variant.price;
        }
    });
    return lowestPrice !== Infinity ? lowestPrice : 'No disponible';
};


const CollectionPage = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Realizar la llamada al servidor para obtener el listado de productos
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5005/products'); // Cambia la URL si es diferente
                setProducts(response.data); // Establecer el listado de productos en el estado
            } catch (error) {
                console.error('Error fetching products:', error);
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
                            <p>Precio: {getLowestPrice(product.variants)}</p>
                            <Link to={`/products/${product.id}`}>Ver Detalles</Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CollectionPage;