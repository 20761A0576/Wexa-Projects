import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
    const { authData, logout } = useAuth();

    return (
        <nav>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/profile">Profile</Link>
            {authData ? (
                <button onClick={logout}>Logout</button>
            ) : (
                <>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </>
            )}
        </nav>
    );
};

export default Navbar;
