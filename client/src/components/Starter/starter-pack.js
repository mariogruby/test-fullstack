import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import './starter-styles.css';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import { useCart } from '../../context/cart.context';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import BindingsService from '../../services/bindings.service';
import BootsService from '../../services/boots.service';
import GogglesService from '../../services/goggles.service';
import HelmetsService from '../../services/helmets.service';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import DoneIcon from '@mui/icons-material/Done';


export default function StarterPack() {
    const [products, setProducts] = useState(null);
    const [error, setError] = useState(null);
    const [successMessages, setSuccessMessages] = useState({});
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const bindingId = 362659859;
                const bootId = 379223156597;
                const goggleId = 46523485957;
                const helmetId = 23256558;

                const binding = await BindingsService.fetchBindingsById(bindingId);
                const boot = await BootsService.fetchBootById(bootId);
                const goggle = await GogglesService.fetchGogglesById(goggleId);
                const helmet = await HelmetsService.fetchHelmetById(helmetId);

                setProducts({
                    binding,
                    boot,
                    goggle,
                    helmet,
                });
            } catch (error) {
                console.error('Error al obtener productos', error);
            }
        }
        fetchProducts();
    }, []);

    const addToCartHandler1 = async (productId, title, price, image) => {
        try {
            const product1 = await BindingsService.addToCart(productId, title, price, image);
            addToCart({ id: productId, title, price, image });
            if (product1) {
                setSuccessMessages({ ...successMessages, [productId]: 'Added to cart' });
                setError(null);
                setTimeout(() => {
                    setSuccessMessages({ ...successMessages, [productId]: null });
                }, 3000);
            } else {
                setError(product1.error || 'Error adding product to cart');
                setSuccessMessages({ ...successMessages, [productId]: null });
                setTimeout(() => {
                    setError(null);
                }, 3000);
            }
        } catch (error) {
            console.error('Error adding product to cart', error);
        }
    };

    const addToCartHandler2 = async (productId, title, price, image) => {
        try {
            const product2 = await BootsService.addToCart(productId, title, price, image)
            addToCart({ id: productId, title, price, image });
            if (product2) {
                setSuccessMessages({ ...successMessages, [productId]: 'Added to cart' });
                setError(null);
                setTimeout(() => {
                    setSuccessMessages({ ...successMessages, [productId]: null });
                }, 3000);
            } else {
                setError(product2.error || 'Error adding product to cart');
                setSuccessMessages({ ...successMessages, [productId]: null });
                setTimeout(() => {
                    setError(null);
                }, 3000);
            }
        } catch (error) {
            console.error('Error adding product to cart', error);
        }
    }

    const addToCartHandler3 = async (productId, title, price, image) => {
        try {
            const product3 = await GogglesService.addToCart(productId, title, price, image)
            addToCart({ id: productId, title, price, image });
            if (product3) {
                setSuccessMessages({ ...successMessages, [productId]: 'Added to cart' });
                setError(null);
                setTimeout(() => {
                    setSuccessMessages({ ...successMessages, [productId]: null });
                }, 3000);
            } else {
                setError(product3.error || 'Error adding product to cart');
                setSuccessMessages({ ...successMessages, [productId]: null });
                setTimeout(() => {
                    setError(null);
                }, 3000);
            }
        } catch (error) {
            console.error('Error adding product to cart', error);
        }
    }

    const addToCartHandler4 = async (productId, title, price, image) => {
        try {
            const product4 = await HelmetsService.addToCart(productId, title, price, image)
            addToCart({ id: productId, title, price, image });
            if (product4) {
                setSuccessMessages({ ...successMessages, [productId]: 'Added to cart' });
                setError(null);
                setTimeout(() => {
                    setSuccessMessages({ ...successMessages, [productId]: null });
                }, 3000);
            } else {
                setError(product4.error || 'Error adding product to cart');
                setSuccessMessages({ ...successMessages, [productId]: null });
                setTimeout(() => {
                    setError(null);
                }, 3000);
            }
        } catch (error) {
            console.error('Error adding product to cart', error);
        }
    }

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Click to Add to cart
        </Tooltip>
    );

    return (
        <div className="back-grnd">
            <h2>Best Accesories</h2>
            {products && (
                <Container>
                    <Row className="mt-3 no-gutters m-0">
                        <Col className="p-0">
                            <Link to={''} className="d-block">
                                <Image src={products.binding.image} rounded style={{ width: '400px', height: '400px' }} />
                            </Link>
                            <OverlayTrigger
                                placement="top"
                                delay={{ show: 250, hide: 400 }}
                                overlay={renderTooltip}>
                                <Link className="icon-link icon-link-hover link-offset-2 link-underline link-underline-opacity-0 text-dark mt-2"
                                    onClick={() => addToCartHandler1(products.binding.id, products.binding.title, products.binding.price, products.binding.image)}>
                                    <h5>{products.binding.title}</h5>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8" />
                                    </svg>
                                </Link>
                            </OverlayTrigger>
                            <ShoppingCartOutlinedIcon />
                            {successMessages[products.binding.id] && (
                                <div><span className="badge text-bg-success"><DoneIcon /> {successMessages[products.binding.id]}</span></div>
                            )}
                        </Col>

                        <Col className="p-0">
                            <Link to={''} className="d-block">
                                <Image src={products.boot.image} rounded style={{ width: '400px', height: '400px' }} />
                            </Link>
                            <OverlayTrigger
                                placement="top"
                                delay={{ show: 250, hide: 400 }}
                                overlay={renderTooltip}>
                                <Link className="icon-link icon-link-hover link-offset-2 link-underline link-underline-opacity-0 text-dark mt-2"
                                    onClick={() => addToCartHandler2(products.boot.id, products.boot.title, products.boot.price, products.boot.image)}>
                                    <h5>{products.boot.title}</h5>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8" />
                                    </svg>
                                </Link>
                            </OverlayTrigger>
                            <ShoppingCartOutlinedIcon />
                            {successMessages[products.boot.id] && (
                                <div><span className="badge text-bg-success"><DoneIcon /> {successMessages[products.boot.id]}</span></div>
                            )}
                        </Col>
                    </Row>

                    <Row className="mt-3 no-gutters m-0">
                        <Col className="p-0">
                            <Link to={''} className="d-block">
                                <Image src={products.goggle.image} rounded style={{ width: '400px', height: '400px' }} />
                            </Link>
                            <OverlayTrigger
                                placement="top"
                                delay={{ show: 250, hide: 400 }}
                                overlay={renderTooltip}>
                                <Link className="icon-link icon-link-hover link-offset-2 link-underline link-underline-opacity-0 text-dark mt-2"
                                    onClick={() => addToCartHandler3(products.goggle.id, products.goggle.title, products.goggle.price, products.goggle.image)}>
                                    <h5>{products.goggle.title}</h5>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8" />
                                    </svg>
                                </Link>
                            </OverlayTrigger>
                            <ShoppingCartOutlinedIcon />
                            {successMessages[products.goggle.id] && (
                                <div><span className="badge text-bg-success"><DoneIcon /> {successMessages[products.goggle.id]}</span></div>
                            )}
                        </Col>

                        <Col className="p-0">
                            <Link to={''} className="d-block">
                                <Image src={products.helmet.image} rounded style={{ width: '400px', height: '400px' }} />
                            </Link>
                            <OverlayTrigger
                                placement="top"
                                delay={{ show: 250, hide: 400 }}
                                overlay={renderTooltip}>
                                <Link className="icon-link icon-link-hover link-offset-2 link-underline link-underline-opacity-0 text-dark mt-2"
                                    onClick={() => addToCartHandler4(products.helmet.id, products.helmet.title, products.helmet.price, products.helmet.image)}>
                                    <h5>{products.helmet.title}</h5>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8" />
                                    </svg>
                                </Link>
                            </OverlayTrigger>
                            <ShoppingCartOutlinedIcon />
                            {successMessages[products.helmet.id] && (
                                <div><span className="badge text-bg-success"><DoneIcon /> {successMessages[products.helmet.id]}</span></div>
                            )}
                        </Col>
                    </Row>
                </Container>
            )}
        </div>
    )
}