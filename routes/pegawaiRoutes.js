// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const PegawaiController = require('../controllers/PegawaiController');

router.get('/', authMiddleware, PegawaiController.getAllPegawai);
router.post('/', authMiddleware, PegawaiController.addPegawai);
router.get('/:id', authMiddleware, PegawaiController.getPegawaiById);
router.put('/:id', authMiddleware, PegawaiController.updatePegawai);
router.delete('/:id', authMiddleware, PegawaiController.deletePegawai);

module.exports = router;
