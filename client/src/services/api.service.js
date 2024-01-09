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

    addToCart: async (id, title, price, quantity) => {
        try {
            const token = localStorage.getItem('authToken');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            const response = await axios.post(
                `${process.env.REACT_APP_SERVER_URL}/api/cart/add/${id}`,
                { id, quantity, title, price },
                config
            );
            return response.data;
        } catch (error) {
            throw new Error('Error adding product to cart:', error);
        }
    },


    getCartProducts: async () => {
        try {
            const token = localStorage.getItem('authToken');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            const response = await axios.get(
                `${process.env.REACT_APP_SERVER_URL}/api/user/cart`, // Ruta en el backend para obtener el carrito del usuario
                config
            );
            return response.data;
        } catch (error){
            throw new Error('Error fetching user cart:', error);
        }
    }
};

export default ApiService;
