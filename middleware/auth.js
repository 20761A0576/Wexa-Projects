const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(403).send('No token provided');

    jwt.verify(token, 'your_jwt_secret', (err, decoded) => {
        if (err) return res.status(401).send('Unauthorized');
        req.user = { id: decoded.id };
        next();
    });
};

module.exports = { verifyToken };
