import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [authData, setAuthData] = useState(null);
    const navigate = useNavigate();

    const login = (data) => {
        setAuthData(data);
        localStorage.setItem('authData', JSON.stringify(data));
    };

    const logout = () => {
        setAuthData(null);
        localStorage.removeItem('authData');
        navigate('/login');
    };

    useEffect(() => {
        const storedAuthData = localStorage.getItem('authData');
        if (storedAuthData) {
            setAuthData(JSON.parse(storedAuthData));
        }
    }, []);

    return (
        <AuthContext.Provider value={{ authData, setAuthData, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
