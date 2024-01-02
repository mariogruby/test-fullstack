import axios from 'axios';

const ApiService = {

    //llamada a todos los productos
    fetchProducts: async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/products`);
            return response.data;
        } catch (error) {
            throw new Error('Error fetching products:', error);
        }
    },

    // llamada a el producto por  el id 
    fetchProductById: async (id) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/products/${id}`);
            return response.data;
        } catch (error) {
            throw new Error('Error fetching product:', error);
        }
    },
};

export default ApiService;
