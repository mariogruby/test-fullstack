// import './styles-collections.css';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ApiService from '../../services/api.service';
import ApiCollections from '../collectionsPage/api-collections';
import authService from '../../services/auth.service';
import SliderCollections from '../../components/Slider/slider-collections'
import TopSection from '../../components/Top/top'
import NavbarPage from '../../components/Navbar/navbar';
import Overview from '../../components/Overview/overview';
import Footer from '../../components/Footer/footer';
import Container from 'react-bootstrap/Container';
import ListCollections from '../../components/List/list-collections';
import Slider from 'react-slick'; // Importa el componente Slider de react-slick
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const LandingPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

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

  // const addToCart = async (productId, title, price) => {
  //   try {
  //     await ApiService.addToCart(productId, title, price);
  //     console.log('Producto agregado al carrito exitosamente');
  //   } catch (error) {
  //     console.error('Error al agregar producto al carrito:', error);
  //   }
  // };

  const handleSearch = (searchQuery) => {
    setSearchQuery(searchQuery);
    if (searchQuery.trim() === '') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (product) =>
          product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  };
  // const PrevArrow = ({ onClick }) => <div onClick={onClick}>&lt; Anterior</div>;
  // const NextArrow = ({ onClick }) => <div onClick={onClick}>Siguiente &gt;</div>;

  // Configuración del slider
  // const sliderSettings = {
  //   dots: false,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 3, // Número de productos mostrados a la vez
  //   slidesToScroll: 1,
  //   prevArrow: <PrevArrow />,
  //   nextArrow: <NextArrow />,
  //   responsive: [
  //     {
  //       breakpoint: 768,
  //       settings: {
  //         slidesToShow: 2,
  //       },
  //     },
  //     {
  //       breakpoint: 480,
  //       settings: {
  //         slidesToShow: 1,
  //       },
  //     },
  //   ],
  // };

  return (
    <>
      {/* <NavbarPage handleSearch={handleSearch} /> */}
      {searchQuery.trim() === '' && <Overview />}
        <ListCollections />
        <SliderCollections />
        <TopSection />
        <Footer />
    </>
  );
};

export default LandingPage;
