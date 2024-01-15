import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BootsService from '../../services/boots.service';
import Navbar from '../../components/Navbar/navbar';

const Boots = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchBoots = async () => {
            try {
                const productsData = await BootsService.fetchBoots();
                setProducts(productsData);
                setFilteredProducts(productsData);
            } catch (error) {
                console.error(error);
            }
        };
        fetchBoots();
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

      return( 
        <>
        <Navbar handleSearch={handleSearch}/>
        <h1>boots</h1>
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
              <Link to={`/products/boots/${product.id}`}>Ver Detalles</Link>
              {/* <button onClick={() => addToCart(product.id, product.title, product.price)}>Agregar al Carrito</button> */}
            </div>
          </div>
        ))}
      </div>
        </>
      );
}

export default Boots;