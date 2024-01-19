import axios from 'axios';

const GogglesService = {
    fetchGoggles: async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/goggles/products/goggles`);
            return response.data 
        } catch (error) {
            throw new Error('Error fetching products:', error);
        }
    },

    fetchGogglesById: async (productId) => {
        try{
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/goggles/products/goggles/${productId}`);
            return response.data;
        } catch (error){
            throw new Error('Error fetching product:', error);
        }
    },

    addToCart: async (productId, title, price, quantity) => {
        try {
            const token = localStorage.getItem('authToken');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            const response = await axios.post(
                `${process.env.REACT_APP_SERVER_URL}/goggles/cart/add/${productId}`,
                { productId, quantity, title, price},
                config
            );
            return response.data;
        } catch (error) {
            throw new Error('Error adding product to cart:', error);
        }
    },
}

export default GogglesService