import axios from 'axios';

const ApiService = {
    fetchProducts: async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/products`);
            return response.data;
        } catch (error) {
            throw new Error('Error fetching products:', error);
        }
    },

    // Agrega otras llamadas a la API aquí según sea necesario
    fetchProductById: async (id) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/products/${id}`);
            return response.data;
        } catch (error) {
            throw new Error('Error fetching product:', error);
        }
    },
};

export default ApiService;
