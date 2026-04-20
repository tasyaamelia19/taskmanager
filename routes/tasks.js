// routes/tasks.js
// Semua endpoint untuk resource /tasks

const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// ─────────────────────────────────────────────
// GET /tasks — Ambil semua tugas
// ─────────────────────────────────────────────
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tasks ORDER BY created_at DESC');
    res.status(200).json({
      success: true,
      data: result.rows,
    });
  } catch (error) {
    console.error('Error GET /tasks:', error.message);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// ─────────────────────────────────────────────
// GET /tasks/:id — Ambil satu tugas berdasarkan ID
// ─────────────────────────────────────────────
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM tasks WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: `Tugas dengan ID ${id} tidak ditemukan`,
      });
    }

    res.status(200).json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Error GET /tasks/:id:', error.message);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// ─────────────────────────────────────────────
// POST /tasks — Tambah tugas baru
// ─────────────────────────────────────────────
router.post('/', async (req, res) => {
  const { title, description } = req.body;

  // Validasi: title tidak boleh kosong atau hanya spasi
  if (!title || title.trim() === '') {
    return res.status(400).json({
      success: false,
      message: 'Field "title" tidak boleh kosong atau hanya berisi spasi',
    });
  }

  try {
    const result = await pool.query(
      'INSERT INTO tasks (title, description) VALUES ($1, $2) RETURNING *',
      [title.trim(), description || null]
    );

    res.status(201).json({
      success: true,
      message: 'Tugas berhasil ditambahkan',
      data: result.rows[0],
    });
  } catch (error) {
    console.error('Error POST /tasks:', error.message);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// ─────────────────────────────────────────────
// PUT /tasks/:id — Update tugas
// ─────────────────────────────────────────────
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, is_completed } = req.body;

  try {
    // Cek apakah task ada
    const check = await pool.query('SELECT * FROM tasks WHERE id = $1', [id]);
    if (check.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: `Tugas dengan ID ${id} tidak ditemukan`,
      });
    }

    const existing = check.rows[0];

    // Gunakan nilai lama jika tidak dikirim
    const newTitle       = title !== undefined ? title.trim() : existing.title;
    const newDescription = description !== undefined ? description : existing.description;
    const newCompleted   = is_completed !== undefined ? is_completed : existing.is_completed;

    const result = await pool.query(
      `UPDATE tasks
       SET title = $1, description = $2, is_completed = $3
       WHERE id = $4
       RETURNING *`,
      [newTitle, newDescription, newCompleted, id]
    );

    res.status(200).json({
      success: true,
      message: 'Tugas berhasil diperbarui',
      data: result.rows[0],
    });
  } catch (error) {
    console.error('Error PUT /tasks/:id:', error.message);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// ─────────────────────────────────────────────
// DELETE /tasks/:id — Hapus tugas
// ─────────────────────────────────────────────
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM tasks WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: `Tugas dengan ID ${id} tidak ditemukan`,
      });
    }

    res.status(200).json({
      success: true,
      message: `Tugas dengan ID ${id} berhasil dihapus`,
      data: result.rows[0],
    });
  } catch (error) {
    console.error('Error DELETE /tasks/:id:', error.message);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

module.exports = router;
