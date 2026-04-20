// src/controllers/taskController.js
const pool = require('../config/database');

/**
 * GET /tasks
 * Mengambil semua daftar tugas
 */
const getAllTasks = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM tasks ORDER BY created_at DESC'
    );

    res.status(200).json({
      success: true,
      message: 'Berhasil mengambil semua tugas',
      total: result.rows.length,
      data: result.rows,
    });
  } catch (error) {
    console.error('Error getAllTasks:', error.message);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan pada server',
      error: error.message,
    });
  }
};

/**
 * GET /tasks/:id
 * Mengambil satu tugas berdasarkan ID
 */
const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query('SELECT * FROM tasks WHERE id = $1', [id]);

    // Error 404 jika ID tidak ditemukan
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: `Tugas dengan ID ${id} tidak ditemukan`,
      });
    }

    res.status(200).json({
      success: true,
      message: 'Berhasil mengambil tugas',
      data: result.rows[0],
    });
  } catch (error) {
    console.error('Error getTaskById:', error.message);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan pada server',
      error: error.message,
    });
  }
};

/**
 * POST /tasks
 * Menambah tugas baru
 * Input: title (wajib), description (opsional)
 */
const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    // Validasi Input: title tidak boleh kosong atau hanya berisi spasi
    if (!title || title.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Validasi gagal: Field "title" tidak boleh kosong atau hanya berisi spasi',
      });
    }

    const result = await pool.query(
      `INSERT INTO tasks (title, description)
       VALUES ($1, $2)
       RETURNING *`,
      [title.trim(), description || null]
    );

    res.status(201).json({
      success: true,
      message: 'Tugas berhasil ditambahkan',
      data: result.rows[0],
    });
  } catch (error) {
    console.error('Error createTask:', error.message);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan pada server',
      error: error.message,
    });
  }
};

/**
 * PUT /tasks/:id
 * Mengupdate data tugas (title, description, is_completed)
 */
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, is_completed } = req.body;

    // Cek apakah tugas dengan ID tersebut ada
    const checkResult = await pool.query('SELECT * FROM tasks WHERE id = $1', [id]);

    if (checkResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: `Tugas dengan ID ${id} tidak ditemukan`,
      });
    }

    // Validasi: jika title dikirim, tidak boleh kosong
    if (title !== undefined && title.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Validasi gagal: Field "title" tidak boleh kosong atau hanya berisi spasi',
      });
    }

    // Gunakan nilai lama jika field tidak dikirim (partial update)
    const existingTask = checkResult.rows[0];
    const updatedTitle = title !== undefined ? title.trim() : existingTask.title;
    const updatedDescription = description !== undefined ? description : existingTask.description;
    const updatedIsCompleted = is_completed !== undefined ? is_completed : existingTask.is_completed;

    const result = await pool.query(
      `UPDATE tasks
       SET title = $1, description = $2, is_completed = $3
       WHERE id = $4
       RETURNING *`,
      [updatedTitle, updatedDescription, updatedIsCompleted, id]
    );

    res.status(200).json({
      success: true,
      message: 'Tugas berhasil diperbarui',
      data: result.rows[0],
    });
  } catch (error) {
    console.error('Error updateTask:', error.message);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan pada server',
      error: error.message,
    });
  }
};

/**
 * DELETE /tasks/:id
 * Menghapus tugas berdasarkan ID
 */
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'DELETE FROM tasks WHERE id = $1 RETURNING *',
      [id]
    );

    // Error 404 jika ID tidak ditemukan
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
    console.error('Error deleteTask:', error.message);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan pada server',
      error: error.message,
    });
  }
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
