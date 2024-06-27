// Import bcrypt untuk hashing kata sandi
const bcrypt = require('bcryptjs');

// Import sequelize dan model user
const User = require('../models/User'); // Pastikan path ke model User sudah sesuai

// Controller untuk operasi CRUD pada user
const UserController = {
  // Mendapatkan semua user
  async getAllUsers(req, res) {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },

  // Mendapatkan satu user berdasarkan ID
  async getUserById(req, res) {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },

  // Menambahkan user baru
  async addUser(req, res) {
    const { username, email, password } = req.body;

    try {
      let user = await User.findOne({ where: { email } });

      if (user) {
        return res.status(400).json({ message: 'User already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      user = await User.create({
        username,
        email,
        password: hashedPassword
      });

      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },

  // Mengupdate user berdasarkan ID
  async updateUser(req, res) {
    const { username, email, password } = req.body;

    // Build user object
    const userFields = {};
    if (username) userFields.username = username;
    if (email) userFields.email = email;
    if (password) {
      // Encrypt the password before updating
      userFields.password = await bcrypt.hash(password, 10);
    }

    try {
      let user = await User.findByPk(req.params.id);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      await user.update(userFields);

      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },

  // Menghapus user berdasarkan ID
  async deleteUser(req, res) {
    try {
      let user = await User.findByPk(req.params.id);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      await user.destroy();

      res.json({ message: 'success removed user' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
};

module.exports = UserController;
