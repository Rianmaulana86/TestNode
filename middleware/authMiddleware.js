
const jwt = require('jsonwebtoken');
const { secret } = require('../config/jwt');

const authMiddleware = (req, res, next) => {
    const authHeader = req.header('Authorization');
    console.log('Auth Header:', authHeader);

    if (!authHeader) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    const token = authHeader.split(' ')[1];
    console.log('Token:', token);

    try {
        const decoded = jwt.verify(token, secret);
        console.log(decoded);
        req.user = decoded;
        next();
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Invalid token' });
    }
};

module.exports = authMiddleware;
