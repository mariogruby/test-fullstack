import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ApiService from '../../services/api.service';
import authService from '../../services/auth.service';
import Navbar from '../../components/Navbar/Navbar';

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
  
  const addToCart = async (id) => {
    try {

      await authService.verify();
      // Llamar a la API para agregar el producto al carrito
      const response = await ApiService.addToCart(id);
      // Manejar la respuesta si es necesario
      console.log(response.data); // Puedes mostrar un mensaje de éxito al usuario si lo deseas
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <>
      <Navbar handleSearch={handleSearch} />
      <div className="container">
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
              <button onClick={() => addToCart(product.id)}>Agregar al Carrito</button>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default CollectionPage;