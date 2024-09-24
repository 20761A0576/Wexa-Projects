const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');

router.get('/', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('name email');
        res.json(user);
    } catch (err) {
        res.status(500).send('Error fetching profile');
    }
});

router.put('/', verifyToken, async (req, res) => {
    const { name, email } = req.body;
    try {
        const user = await User.findByIdAndUpdate(req.user.id, { name, email }, { new: true });
        res.json(user);
    } catch (err) {
        res.status(500).send('Error updating profile');
    }
});

module.exports = router;
