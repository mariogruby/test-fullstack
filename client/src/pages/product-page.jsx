import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductPage = ({ productId }) => {
  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/products/${productId}`); // Ruta de tu backend para obtener el producto
        setProduct(response.data);
        // Asignar la primera variante como seleccionada por defecto
        setSelectedVariant(response.data.variants[0]);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleVariantChange = (selectedOption) => {
    // Encontrar la variante correspondiente a la opción seleccionada
    const foundVariant = product.variants.find((variant) =>
      variant.selectedOptions.every(
        (option) =>
          option.name !== selectedOption.name ||
          option.value === selectedOption.value
      )
    );
    setSelectedVariant(foundVariant);
  };

  return (
    <div>
      {product ? (
        <div>
          <h2>{product.title}</h2>
          <div dangerouslySetInnerHTML={{ __html: product.body_html }} />

          <h3>Precio: {selectedVariant.price}</h3>

          <select onChange={(e) => handleVariantChange(e.target.value)}>
            {product.options.map((option) => (
              <optgroup key={option.name} label={option.name}>
                {option.values.map((value) => (
                  <option key={value} value={{ name: option.name, value }}>
                    {value}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>

          <div>
            {product.images.map((image) => (
              <img key={image.id} src={image.src} alt={image.alt} />
            ))}
          </div>
        </div>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
};

export default ProductPage;

