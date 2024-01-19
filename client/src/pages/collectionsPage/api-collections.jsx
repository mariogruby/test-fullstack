import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ApiService from '../../services/api.service';
// import authService from '../../services/auth.service';
// import Navbar from '../../components/Navbar/Navbar';
// import NavbarPage from '../../components/Navbar/navbar';
// import Overview from '../../components/Overview/overview';
// import Bindings from '../bindingPage/binding';



const CollectionPage = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productsData = await ApiService.fetchProducts();
                setProducts(productsData);
                setFilteredProducts(productsData); // Establecer los productos filtrados inicialmente con todos los productos
            } catch (error) {
                console.error(error);
            }
        };

        fetchProducts();
    }, []);

    const addToCart = async (productId, title, price) => {
        try {
            // Llamar al servicio para agregar el producto al carrito
            await ApiService.addToCart(productId, title, price); // 1 es la cantidad por defecto (puedes ajustarlo según tus necesidades)

            // Actualizar la UI o realizar alguna acción adicional después de agregar al carrito
            // Por ejemplo, mostrar un mensaje de éxito, actualizar el estado, etc.

            console.log('Producto agregado al carrito exitosamente');
        } catch (error) {
            console.error('Error al agregar producto al carrito:', error);
        }
    };

    //   const handleSearch = (searchQuery) => {
    //     setSearchQuery(searchQuery); // Almacenar el término de búsqueda (opcional, para referencia)
    //     if (searchQuery.trim() === '') {
    //       setFilteredProducts(products); // Si el campo de búsqueda está vacío, mostrar todos los productos
    //     } else {
    //       const filtered = products.filter(
    //         (product) =>
    //           product.title.toLowerCase().includes(searchQuery.toLowerCase())
    //       );
    //       setFilteredProducts(filtered);
    //     }
    //   };

    return (
        <>
            {/* {searchQuery.trim() === '' } */}
            <div className="container">
                <Link to={'/products/bindings'}>Bindings</Link>
                <Link to={'/products/boots'}>Boots</Link>
                <h1>Productos</h1>
                <div className="row">
                    {filteredProducts.map((product) => (
                        <div key={product.id} className="col-md-4">
                            <div className="product-card">
                                {product.image ? (
                                    <img
                                        src={product.image.src}
                                        alt={product.title}
                                        style={{ maxWidth: '200px', maxHeight: '200px' }}
                                    />
                                ) : (
                                    <div>No hay imagen disponible</div>
                                )}
                                <h3>{product.title}</h3>
                                <p>Precio: {`$${product.variants[0].price}`}</p>
                                <Link to={`/products/${product.id}`}>Ver Detalles</Link>
                                <button onClick={() => addToCart(product.id, product.title, product.variants[0].price)}>Agregar al Carrito</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default CollectionPage;