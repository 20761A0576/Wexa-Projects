const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const router = express.Router();

const generateToken = (user) => {
    return jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
};

router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = new User({ name, email, password });
        await user.save();
        res.status(201).send('User registered successfully');
    } catch (err) {
        res.status(400).send('Error registering user');
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.comparePassword(password))) {
        user.lastLogin = new Date();
        await user.save();
        const token = generateToken(user);
        res.json({ token, user: { id: user._id, name: user.name, email: user.email, lastLogin: user.lastLogin } });
    } else {
        res.status(401).send('Invalid email or password');
    }
});

module.exports = router;
