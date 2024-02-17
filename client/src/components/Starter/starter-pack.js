import React, { useState, useEffect } from 'react'
import './starter-styles.css';
import BindingsService from '../../services/bindings.service';
import BootsService from '../../services/boots.service';
import GogglesService from '../../services/goggles.service';
import HelmetsService from '../../services/helmets.service';

export default function StarterPack() {
    const [products, setProducts] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const bindingId = 17858412;
                const bootId = 14526248952;
                const goggleId = 1795462135;
                const helmetId = 17858957;

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

    return (
<div>
    {/* Puedes renderizar los productos aquí */}
    {products && (
      <div className="container text-center">
        <h2>Productos:</h2>
        <div className="row g-2">
            <div className="col-6">
                <img className="tamaño-de-imagen" src={products.binding.image}/>
            </div>
            <div className="col-6">
            <img className="tamaño-de-imagen" src={products.boot.image}/>
            </div>
            <div className="col-6">
            <img className="tamaño-de-imagen" src={products.goggle.image}/>
            </div>
            <div className="col-6">
            <img className="tamaño-de-imagen" src={products.helmet.image}/>
            </div>
        </div>
      </div>
    )}
  </div>
    )
}
