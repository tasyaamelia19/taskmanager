-- database/migration.sql
-- Script untuk membuat database dan tabel 'tasks'
-- Jalankan script ini di PostgreSQL sebelum menjalankan aplikasi

-- 1. Buat database (jalankan sebagai superuser di psql)
-- CREATE DATABASE task_manager_db;

-- 2. Hubungkan ke database task_manager_db, lalu jalankan perintah berikut:

-- Hapus tabel jika sudah ada (opsional, untuk reset)
-- DROP TABLE IF EXISTS tasks;

-- Buat tabel tasks sesuai spesifikasi
CREATE TABLE IF NOT EXISTS tasks (
    id          SERIAL PRIMARY KEY,
    title       VARCHAR(255) NOT NULL,
    description TEXT,
    is_completed BOOLEAN DEFAULT false,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Verifikasi struktur tabel
-- \d tasks

-- Contoh data awal (opsional)
INSERT INTO tasks (title, description) VALUES
    ('Belajar Node.js', 'Pelajari konsep dasar Node.js dan Express'),
    ('Setup PostgreSQL', 'Instalasi dan konfigurasi database PostgreSQL'),
    ('Membuat REST API', 'Bangun endpoint CRUD untuk Task Manager');
