import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import HelmetsService from '../../services/helmets.service';

const HelmetPage = () => {
    const [helmet, setHelmet] = useState(null);
    const { productId } = useParams();

    useEffect(() => {
        const fetchHelmet = async () => {
            try {
                const productData = await HelmetsService.fetchHelmetById(productId);
                setHelmet(productData)
            } catch (error) {
                console.error('Error fetching product', error);
            }
        };
        fetchHelmet();
    }, [productId]);

    return (
        <div className = "container">
            {helmet && (
                <div key={helmet.id}>
                    <img src={helmet.image} alt={helmet.title}/>
                    <h2>{helmet.title}</h2>
                    <p>{helmet.price}</p>
                    <p>{helmet.description}</p>
                    </div>
            )}
        </div>
    );
}

export default HelmetPage;
