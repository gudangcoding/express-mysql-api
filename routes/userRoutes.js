// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { User } = require('../models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { authenticateToken } = require('../middleware');

// Create a new user
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the username is already taken
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already taken' });
    }

    const newUser = await User.create({ username, password, level});
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



// Rute untuk login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Lakukan verifikasi kredensial (contoh sederhana)
    const user = await User.findOne({ where: { username, password } });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Buat token JWT
    const token = jwt.sign({ userId: user.id, username: user.username }, 'your_secret_key', { expiresIn: '1h' });

    // Kirim token sebagai respons ke klien
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rute yang memerlukan otentikasi
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    // Informasi pengguna yang sudah diverifikasi tersedia di req.user
    const userId = req.user.userId;

    // Ambil data pengguna dari basis data
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Kirim data pengguna sebagai respons ke klien
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rute untuk memperbarui profil (memerlukan otentikasi)
router.put('/profile', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { username, email, fullName } = req.body;

    // Ambil data pengguna dari basis data
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Perbarui informasi profil pengguna
    user.username = username || user.username;
    user.email = email || user.email;
    user.fullName = fullName || user.fullName;

    // Simpan perubahan ke basis data
    await user.save();

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
