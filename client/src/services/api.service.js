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

    addToCart: async (id, title, price, image, quantity) => {
        try {
            const token = localStorage.getItem('authToken');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            const response = await axios.post(
                `${process.env.REACT_APP_SERVER_URL}/api/cart/add/${id}`,
                { id, quantity, title, price, image },
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
        } catch (error) {
            throw new Error('Error fetching user cart:', error);
        }
    },

    removeProductFromCart: async (productId) => {
        try {
            const token = localStorage.getItem('authToken');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            const response = await axios.delete(
                `${process.env.REACT_APP_SERVER_URL}/api/cart/remove/${productId}`,
                config

            );
            return response.data
        } catch (error) {
            throw new Error('Error delete product from cart:', error);
        }
    },

    //llamada a producto especifico en landing page

    // fetchProductByIdInLandingPage: async (specificId) => {
    //     try {
    //         const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/products/${specificId}`);
    //         return response.data;
    //     } catch (error) {
    //         throw new Error('Error fetching product:', error);
    //     }
    // },
};

export default ApiService;
