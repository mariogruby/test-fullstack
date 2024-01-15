import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BindingsService from '../../services/bindings.service';

const BindingPage = () => {
    const [binding, setBinding] = useState(null);
    const { productId } = useParams();

    useEffect(() => {
        const fetchBinding = async () => {
            try {
                const productData = await BindingsService.fetchBindingsById(productId);
                setBinding(productData);
            } catch (error) {
                console.error('Error fetching product', error);
            }
        };
        fetchBinding();
    }, [productId]);

    return (
        <div className="container">
            {binding && (
                <div key={binding.id}>
                    <img src={binding.image} alt={binding.title} />
                    <h2>{binding.title}</h2>
                    <p>{binding.price}</p>
                    <p>{binding.description}</p>
                </div>
            )}
        </div>
    );

}
export default BindingPage;