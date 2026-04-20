-- Jalankan query ini di PostgreSQL terlebih dahulu
-- Bisa menggunakan pgAdmin atau psql terminal

-- 1. Buat database (jalankan di psql sebagai superuser)
CREATE DATABASE task_manager_db;

-- 2. Hubungkan ke database task_manager_db, lalu buat tabel
CREATE TABLE tasks (
  id          SERIAL PRIMARY KEY,
  title       VARCHAR(255) NOT NULL,
  description TEXT,
  is_completed BOOLEAN DEFAULT false,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
