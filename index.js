// src/index.js
require('dotenv').config();
const express = require('express');
const logger = require('./middleware/logger');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// ─── Middleware Global ────────────────────────────────────────────────────────

// Middleware untuk parsing JSON body
app.use(express.json());

// Middleware untuk parsing URL-encoded body
app.use(express.urlencoded({ extended: true }));

// Middleware Logging Kustom
app.use(logger);

// ─── Routes ──────────────────────────────────────────────────────────────────

// Root endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Selamat datang di Task Manager API',
    endpoints: {
      'GET /tasks': 'Mengambil semua tugas',
      'GET /tasks/:id': 'Mengambil satu tugas berdasarkan ID',
      'POST /tasks': 'Menambah tugas baru',
      'PUT /tasks/:id': 'Mengupdate tugas',
      'DELETE /tasks/:id': 'Menghapus tugas',
    },
  });
});

// Task routes
app.use('/tasks', taskRoutes);

// ─── Global Error Handler ─────────────────────────────────────────────────────

// Handler untuk route yang tidak ditemukan (404)
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Endpoint ${req.method} ${req.originalUrl} tidak ditemukan`,
  });
});

// Handler untuk error yang tidak tertangani
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err.message);
  res.status(500).json({
    success: false,
    message: 'Terjadi kesalahan internal pada server',
  });
});

// ─── Jalankan Server ──────────────────────────────────────────────────────────

app.listen(PORT, () => {
  console.log('=========================================');
  console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
  console.log('=========================================');
});

module.exports = app;
