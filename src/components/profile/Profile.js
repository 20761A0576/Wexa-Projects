import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';

const Profile = () => {
    const { authData } = useAuth();
    const [profile, setProfile] = useState({ name: '', email: '' });
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/profile', {
                    headers: { Authorization: `Bearer ${authData.token}` },
                });
                setProfile(response.data);
            } catch (error) {
                alert(error);
                setError('Failed to load profile data');
            }
        };

        fetchProfileData();
    }, [authData]);

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        try {
            await axios.put('http://localhost:5000/api/profile', profile, {
                headers: { Authorization: `Bearer ${authData.token}` },
            });
            alert('Profile updated successfully');
        } catch (error) {
            setError('Failed to update profile');
        }
    };

    return (
        <div className="profile">
            <h2>Profile</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleUpdateProfile}>
                <input 
                    type="text" 
                    placeholder="Name" 
                    value={profile.name} 
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })} 
                    required 
                />
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={profile.email} 
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })} 
                    required 
                />
                <button type="submit">Update Profile</button>
            </form>
        </div>
    );
};

export default Profile;
