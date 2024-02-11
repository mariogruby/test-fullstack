import axios from 'axios';

const BootsService = {
    fetchBoots: async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/boots/products/boots`);
            return response.data 
        } catch (error) {
            throw new Error('Error fetching products:', error);
        }
    },

    fetchBootById: async (productId) => {
        try{
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/boots/products/boots/${productId}`);
            return response.data;
        } catch (error){
            throw new Error('Error fetching product:', error);
        }
    },

    addToCart: async (productId, title, price, image, quantity) => {
        try {
            const token = localStorage.getItem('authToken');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            const response = await axios.post(
                `${process.env.REACT_APP_SERVER_URL}/boots/cart/add/${productId}`,
                { productId, quantity, title, price, image},
                config
            );
            return response.data;
        } catch (error) {
            throw new Error('Error adding product to cart:', error);
        }
    },
}

export default BootsService;