import React, { useEffect, useState } from 'react';
import './api-collections.css';
import { useCart } from '../../context/cart.context';
import ApiService from '../../services/api.service';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Container from 'react-bootstrap/Container';

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

    const { addToCart } = useCart();
    const addToCartHandler = async (productId, title, price, image) => {
        try {
            // Llamar al servicio para agregar el producto al carrito
            await ApiService.addToCart(productId, title, price, image);
            addToCart({ id: productId, title, price, image }); // 1 es la cantidad por defecto (puedes ajustarlo según tus necesidades)
            // Actualizar la UI o realizar alguna acción adicional después de agregar al carrito
            // Por ejemplo, mostrar un mensaje de éxito, actualizar el estado, etc.
            console.log('Producto agregado al carrito exitosamente');
        } catch (error) {
            console.error('Error al agregar producto al carrito:', error);
        }
    };

    return (
        <>
            <Container>
                <div className="row">
                    {products.map((product)=>(
                        <div key={product.id} className="col">
                            <div className="card mb-3 mt-3" style={{width: '18rem'}}>
                                {product.image ? (
                                    <img 
                                    src={product.image.src}
                                    alt={product.title}
                                    style={{ maxWidth: '300px', maxHeight: '280px' }}
                                    className="card-img-top"/>
                                ) : (
                                    <img 
                                    src="https://cdn.shopify.com/s/files/1/0756/0996/4822/products/snowboard_sky.png?v=1683140445"
                                    alt={product.title}
                                    style={{ maxWidth: '300px', maxHeight: '280px' }}
                                    className="card-img-top"/>
                                )}
                                <hr></hr>
                                <h6 className="card-title mt-3 mb-3">{product.title}</h6>
                                <button className="btn btn-primary">
                                <ShoppingCartOutlinedIcon 
                                onClick={() => addToCartHandler(product.id, product.title, product.variants[0].price, product.image.src)}
                                className="ms-auto mb-2"/></button>
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </>
    );
};

export default CollectionPage;

// https://cdn.shopify.com/s/files/1/0756/0996/4822/products/snowboard_sky.png?v=1683140445

{/* <div className="container">
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
                <button onClick={() => addToCart(product.id, product.title, product.variants[0].price, product.image.src)}>Agregar al Carrito</button>
            </div>
        </div>
    ))}
</div>
</div> */}


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
