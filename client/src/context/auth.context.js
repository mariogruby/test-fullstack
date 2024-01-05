import React, { createContext, useState, useEffect, useContext } from 'react';
import authService from '../services/auth.service'

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const verifyToken = async () => {
            try {
                const response = await authService.verify();
                setUser(response.data);
            } catch (error){
                setUser(null)
            }
            setLoading(false);
        };
        verifyToken();
    }, []);

    return (
        <AuthContext.Provider  value={{user, setUser, loading}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext)
};
