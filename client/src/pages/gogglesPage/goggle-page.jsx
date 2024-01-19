import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import GogglesService from '../../services/goggles.service';

const GogglePage = () => {
    const [goggle, setGoggle] = useState(null);
    const { productId } = useParams();

    useEffect(() => {
        const fetchGoggle = async () => {
            try {
                const productData = await GogglesService.fetchGogglesById(productId);
                setGoggle(productData)
            } catch (error) {
                console.error('Error fetching product', error);
            }
        };
        fetchGoggle();
    }, [productId]);

    return (
        <div className = "container">
            {goggle && (
                <div key={goggle.id}>
                    <img src={goggle.image} alt={goggle.title}/>
                    <h2>{goggle.title}</h2>
                    <p>{goggle.price}</p>
                    <p>{goggle.description}</p>
                    </div>
            )}
        </div>
    );
}

export default GogglePage;
