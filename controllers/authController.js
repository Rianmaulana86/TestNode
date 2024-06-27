// controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { secret } = require('../config/jwt');
const User = require('../models/User');
const { generateErrorResponse } = require('../utils/responseUtil');
const redisClient = require('../config/redis'); 

exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ username, email, password: hashedPassword });
        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json(generateErrorResponse(error));
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        const token = jwt.sign({ id: user.id, email: user.email }, secret, { expiresIn: '1h' });
        res.status(200).json({ message: 'Logged in successfully', token });
    } catch (error) {
        console.error(error);
        res.status(500).json(generateErrorResponse(error));
    }
};

exports.logout = async (req, res) => {
    try {
        const token = req.header('Authorization').split(' ')[1];
        if (!token) {
            return res.status(400).json({ message: 'No token provided' });
        }

        // Masukkan token ke dalam blacklist Redis
        redisClient.set(token, 'blacklisted', 'EX', 3600); // Set token expire in 1 hour

        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json(generateErrorResponse(error));
    }
};
