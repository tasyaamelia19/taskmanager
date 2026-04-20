// index.js — Entry point aplikasi Task Manager

const express = require('express');
const app = express();
const PORT = 3000;

// Import middleware & routes
const logger    = require('./middleware/logger');
const taskRoutes = require('./routes/tasks');

// ── Built-in Middleware ──────────────────────
app.use(express.json());                  // Parse body JSON
app.use(express.urlencoded({ extended: true })); // Parse body form

// ── Custom Middleware: Logging ───────────────
app.use(logger);

// ── Routes ───────────────────────────────────
app.use('/tasks', taskRoutes);

// ── Root endpoint ────────────────────────────
app.get('/', (req, res) => {
  res.json({ message: '🚀 Task Manager API berjalan dengan baik!' });
});

// ── 404 fallback untuk route tidak dikenal ───
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route tidak ditemukan' });
});

// ── Start Server ─────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
});
