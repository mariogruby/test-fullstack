import axios from 'axios';

const BindingsService = {

    fetchBindings: async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/bindings/products/bindings`);
            return response.data
        } catch (error) {
            throw new Error('Error fetching products:', error);
        }
    },

    fetchBindingsById: async (productId) => {
        try{
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/bindings/products/bindings/${productId}`);
            return response.data;
        } catch (error){
            throw new Error('Error fetching product:', error);
        }
    },
    
    addToCart: async (productId, title, price, image, quantity) => {
        try{
            const token = localStorage.getItem('authToken');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            const response = await axios.post(
                `${process.env.REACT_APP_SERVER_URL}/bindings/cart/add/${productId}`,
                { productId, quantity, title, price, image },
                config
            );
            return response.data;
        } catch (error) {
            throw new Error('Error adding product to cart:', error);
        }
    },
}

export default  BindingsService