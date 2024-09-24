const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');

router.get('/activity', verifyToken, (req, res) => {
    const activities = ['Logged in', 'Updated profile', 'Sent friend request']; // Sample activities
    res.json(activities);
});

router.get('/friends', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate('friends', 'name');
        res.json(user.friends);
    } catch (err) {
        res.status(500).send('Error fetching friends');
    }
});

module.exports = router;
