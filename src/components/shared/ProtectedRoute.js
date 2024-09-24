import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ component: Component }) => {
    const { authData } = useAuth();

    return authData ? <Component /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
