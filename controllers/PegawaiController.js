// Import bcrypt untuk hashing kata sandi
const bcrypt = require('bcryptjs');

// Import sequelize dan model Pegawai
const Pegawai = require('../models/Pegawai'); // Pastikan path ke model Pegawai sudah sesuai

// Controller untuk operasi CRUD pada pegawai
const PegawaiController = {
  // Mendapatkan semua pegawai
  async getAllPegawai(req, res) {
    try {
      const pegawai = await Pegawai.findAll();
      res.json(pegawai);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },

  // Mendapatkan satu pegawai berdasarkan ID
  async getPegawaiById(req, res) {
    try {
      const pegawai = await Pegawai.findByPk(req.params.id);
      if (!pegawai) {
        return res.status(404).json({ message: 'Pegawai not found' });
      }
      res.json(pegawai);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },

  // Menambahkan pegawai baru
  async addPegawai(req, res) {
    const { name, addres, age, gender, image } = req.body;

    try {
      let pegawai = await Pegawai.findOne({ where: { name, addres } });

      if (pegawai) {
        return res.status(400).json({ message: 'Pegawai already exists' });
      }

      pegawai = await Pegawai.create({
        name,
        addres,
        age,
        gender,
        image
      });

      res.json(pegawai);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },

  // Mengupdate pegawai berdasarkan ID
  async updatePegawai(req, res) {
    const { name, addres, age, gender, image } = req.body;

    // Build pegawai object
    const pegawaiFields = {};
    if (name) pegawaiFields.name = name;
    if (addres) pegawaiFields.addres = addres;
    if (age) pegawaiFields.age = age;
    if (gender) pegawaiFields.gender = gender;
    if (image) pegawaiFields.image = image;

    try {
      let pegawai = await Pegawai.findByPk(req.params.id);

      if (!pegawai) {
        return res.status(404).json({ message: 'Pegawai not found' });
      }

      await pegawai.update(pegawaiFields);

      res.json(pegawai);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },

  // Menghapus pegawai berdasarkan ID
  async deletePegawai(req, res) {
    try {
      let pegawai = await Pegawai.findByPk(req.params.id);

      if (!pegawai) {
        return res.status(404).json({ message: 'Pegawai not found' });
      }

      await pegawai.destroy();

      res.json({ message: 'success removed pegawai' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
};

module.exports = PegawaiController;
