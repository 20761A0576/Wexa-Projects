import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';

const Dashboard = () => {
    const { authData, logout } = useAuth();
    const [activityFeed, setActivityFeed] = useState([]);
    const [friends, setFriends] = useState([]);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const activityResponse = await axios.get('/api/dashboard/activity', {
                    headers: { Authorization: `Bearer ${authData.token}` },
                });
                setActivityFeed(activityResponse.data);

                const friendsResponse = await axios.get('/api/dashboard/friends', {
                    headers: { Authorization: `Bearer ${authData.token}` },
                });
                setFriends(friendsResponse.data);
            } catch (error) {
                console.error('Failed to fetch dashboard data:', error);
            }
        };

        fetchDashboardData();
    }, [authData]);

    return (
        <div className="dashboard">
            <h2>Welcome, {authData.user.name}!</h2>
            <p>Last Login: {new Date(authData.user.lastLogin).toLocaleString()}</p>
            <h3>Activity Feed</h3>
            <ul>
                {activityFeed.map((activity, index) => (
                    <li key={index}>{activity}</li>
                ))}
            </ul>
            <h3>Friends</h3>
            <ul>
                {friends.map((friend, index) => (
                    <li key={index}>{friend.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;
