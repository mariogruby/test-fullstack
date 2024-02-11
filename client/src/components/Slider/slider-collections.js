import './styles-collections.css';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ApiService from '../../services/api.service';
// import ApiCollections from './api-collections';
import Image from 'react-bootstrap/Image';
import ListCollections from '../../components/List/list-collections';
import Slider from 'react-slick'; // Importa el componente Slider de react-slick
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Container from 'react-bootstrap/Container'
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';

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
    const PrevArrow = ({ onClick }) =>
        <button type="button" className="btn btn-light custom-arrow-prev" onClick={onClick}><ArrowBackRoundedIcon className="text-dark"/></button>;
    const NextArrow = ({ onClick }) =>
        <button type="button" className="btn btn-light custom-arrow-next" onClick={onClick}><ArrowForwardRoundedIcon className="text-dark"/></button>;

    // Configuración del slider
    const sliderSettings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
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
            <div className="b-g">
                <h1 className="title py-5">Snowboards Collections</h1>
                <Slider className="mb-5" {...sliderSettings}>
                    {filteredProducts.map((product) => (
                        <div key={product.id} className="product-card mb-3">
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
                            <a href={`/products/${product.id}`}
                                className="link-light link-offset-2 link-underline-opacity-0 link-underline-opacity-100-hover">
                                <h5 className="mt-2 titulo">{product.title}</h5></a>
                            <p className="text-white precio">Precio: {`$${product.variants[0].price}`}</p>
                            {/* <Link to={`/products/${product.id}`}>Ver Detalles</Link> */}
                            {/* <button
                                onClick={() =>
                                    addToCart(product.id, product.title, product.variants[0].price)
                                }
                            >
                                Agregar al Carrito
                            </button> */}
                        </div>

                    ))}
                </Slider>
                <a href="/products/snowboards" type="button" className="btncollection btn btn-light mt-2 mb-5">View all</a>
            </div> 
            {/* </Container> */}
        </>
    );
};

export default SliderComponent;
