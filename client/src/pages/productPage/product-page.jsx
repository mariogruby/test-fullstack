import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ApiService from '../../services/api.service'

const ProductPage = () => {
  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [sliderIndex, setSliderIndex] = useState(0); // Estado para controlar el índice del carrusel
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await ApiService.fetchProductById(id)
        setProduct(productData);
        setSelectedVariant(productData.variants[0]);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleVariantChange = (event) => {
    const value = event.target.value;
    const selectedVariant = product.variants.find(
      (variant) => variant.option1 === value
    );
    setSelectedVariant(selectedVariant);
    const selectedImageIndex = product.images.findIndex(
      (image) => image.id === selectedVariant.image_id
    );
    setSliderIndex(selectedImageIndex); // Actualiza el índice del carrusel al cambiar la variante
  };

  return (
    <div className="product-details">
      {product && (
        <>
          <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
              {product.images.map((image, index) => (
                <div className={`carousel-item ${index === sliderIndex ? 'active' : ''}`} key={index}>
                  <img
                    src={image.src}
                    className="d-block w-100"
                    alt={`Product ${index}`}
                    style={{ maxWidth: '200px', maxHeight: '100px' }}
                  />
                </div>
              ))}
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>

          <h2>{product.title}</h2>
          <h4 dangerouslySetInnerHTML={{ __html: product.body_html }} />
          <p>Price: ${selectedVariant?.price}</p>
          <select onChange={handleVariantChange}>
            {product.options[0]?.values.map((value, index) => (
              <option key={index} value={value}>
                {value}
              </option>
            ))}
          </select>
        </>
      )}
    </div>
  );
};

export default ProductPage;

