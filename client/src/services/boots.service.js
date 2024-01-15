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
}

export default BootsService;