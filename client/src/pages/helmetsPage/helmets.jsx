import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import HelmetsService from '../../services/helmets.service';
import Navbar from '../../components/Navbar/navbar';

const Helmets = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchHelmets = async () => {
            try {
                const productsData = await HelmetsService.fetchHelmets();
                setProducts(productsData);
                setFilteredProducts(productsData);
            } catch (error) {
                console.error(error);
            }
        };
        fetchHelmets();
    }, [])

    const handleSearch = (searchQuery) => {
        setSearchQuery(searchQuery); // Almacenar el término de búsqueda (opcional, para referencia)
        if (searchQuery.trim() === '') {
            setFilteredProducts(products); // Si el campo de búsqueda está vacío, mostrar todos los productos
        } else {
            const filtered = products.filter(
                (product) =>
                    product.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredProducts(filtered);
        }
    };

    const addToCart = async (productId, title, price) => {
        try {
            // Llamar al servicio para agregar el producto al carrito
            await HelmetsService.addToCart(productId, title, price); // 1 es la cantidad por defecto (puedes ajustarlo según tus necesidades)

            // Actualizar la UI o realizar alguna acción adicional después de agregar al carrito
            // Por ejemplo, mostrar un mensaje de éxito, actualizar el estado, etc.

            console.log('Producto agregado al carrito exitosamente');
        } catch (error) {
            console.error('Error al agregar producto al carrito:', error);
        }
    }; // Agregar searchQuery como dependencia para reaccionar a cambios
    return (
        <>
            <Navbar handleSearch={handleSearch} />
            <h1>helmets</h1>
            <div className="row">
                {filteredProducts.map((product) => (
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
                            <Link to={`/products/helmets/${product.id}`}>Ver Detalles</Link>
                            <button onClick={() => addToCart(product.id, product.title, product.price)}>Agregar al Carrito</button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default Helmets;