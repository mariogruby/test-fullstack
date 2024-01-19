import './styles-collections.css';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ApiService from '../../services/api.service';
// import ApiCollections from './api-collections';
import authService from '../../services/auth.service';
import NavbarPage from '../../components/Navbar/navbar';
import Overview from '../../components/Overview/overview';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import ListCollections from '../../components/List/list-collections';
import Slider from 'react-slick'; // Importa el componente Slider de react-slick
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const SliderComponent = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    //   const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productsData = await ApiService.fetchProducts();
                setProducts(productsData);
                setFilteredProducts(productsData);
            } catch (error) {
                console.error(error);
            }
        };

        fetchProducts();
    }, []);

    const addToCart = async (productId, title, price) => {
        try {
            await ApiService.addToCart(productId, title, price);
            console.log('Producto agregado al carrito exitosamente');
        } catch (error) {
            console.error('Error al agregar producto al carrito:', error);
        }
    };

    //   const handleSearch = (searchQuery) => {
    //     setSearchQuery(searchQuery);
    //     if (searchQuery.trim() === '') {
    //       setFilteredProducts(products);
    //     } else {
    //       const filtered = products.filter(
    //         (product) =>
    //           product.title.toLowerCase().includes(searchQuery.toLowerCase())
    //       );
    //       setFilteredProducts(filtered);
    //     }
    //   };
    const PrevArrow = ({ onClick }) => <div onClick={onClick}>&lt; Anterior</div>;
    const NextArrow = ({ onClick }) => <div onClick={onClick}>Siguiente &gt;</div>;

    // Configuración del slider
    const sliderSettings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4, // Número de productos mostrados a la vez
        slidesToScroll: 1,
        prevArrow: <PrevArrow />,
        nextArrow: <NextArrow />,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    return (
        <>
            {/* <NavbarPage handleSearch={handleSearch} /> */}
            {/* {searchQuery.trim() === '' && <Overview />} */}
            {/* <Container> */}
                <Slider {...sliderSettings}>
                    {filteredProducts.map((product) => (
                        <div key={product.id} className="product-card">
                            <Link to={`/products/${product.id}`}>
                            <div className="product-image-container">
                                {product.image ? (
                                    <Image
                                    rounded 
                                        src={product.image.src}
                                        alt={product.title}
                                        className="product-image mt-3"
                                    />
                                ) : (
                                    <div>No hay imagen disponible</div>
                                    
                                )}
                                
                            </div>
                            </Link>
                            <a href={`/products/${product.id}`} className="link-underline link-underline-opacity-0 text-dark"><h5 className="mt-3">{product.title}</h5></a>
                            <p>Precio: {`$${product.variants[0].price}`}</p>
                            {/* <Link to={`/products/${product.id}`}>Ver Detalles</Link> */}
                            <button
                                onClick={() =>
                                    addToCart(product.id, product.title, product.variants[0].price)
                                }
                            >
                                Agregar al Carrito
                            </button>
                        </div>
                        
                    ))}
                </Slider>
            {/* </Container> */}
        </>
    );
};

export default SliderComponent;
