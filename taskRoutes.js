// src/routes/taskRoutes.js
const express = require('express');
const router = express.Router();
const {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');

// GET /tasks - Mengambil semua tugas
router.get('/', getAllTasks);

// GET /tasks/:id - Mengambil satu tugas berdasarkan ID
router.get('/:id', getTaskById);

// POST /tasks - Menambah tugas baru
router.post('/', createTask);

// PUT /tasks/:id - Mengupdate tugas
router.put('/:id', updateTask);

// DELETE /tasks/:id - Menghapus tugas
router.delete('/:id', deleteTask);

module.exports = router;
