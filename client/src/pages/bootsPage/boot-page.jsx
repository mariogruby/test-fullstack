import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BootsService from '../../services/boots.service';

const BootPage = () => {
    const [boot, setBoot] = useState(null);
    const { productId } = useParams();

    useEffect(() => {
        const fetchBoot = async () => {
            try {
                const productData = await BootsService.fetchBootById(productId);
                setBoot(productData)
            } catch (error) {
                console.error('Error fetching product', error);
            }
        };
        fetchBoot();
    }, [productId]);

    return (
        <div className = "container">
            {boot && (
                <div key={boot.id}>
                    <img src={boot.image} alt={boot.title}/>
                    <h2>{boot.title}</h2>
                    <p>{boot.price}</p>
                    <p>{boot.description}</p>
                    </div>
            )}
        </div>
    );
}

export default BootPage;
