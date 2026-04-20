# 📋 Task Manager Backend API

Backend REST API untuk aplikasi Task Manager menggunakan **Node.js**, **Express.js**, dan **PostgreSQL**.

---

## 🗂️ Struktur Proyek

```
task-manager/
├── src/
│   ├── config/
│   │   └── database.js       # Konfigurasi koneksi PostgreSQL (pg Pool)
│   ├── controllers/
│   │   └── taskController.js # Logic CRUD semua endpoint
│   ├── middleware/
│   │   └── logger.js         # Middleware logging kustom
│   ├── routes/
│   │   └── taskRoutes.js     # Definisi semua route /tasks
│   └── index.js              # Entry point aplikasi
├── database/
│   └── migration.sql         # Script SQL pembuatan tabel
├── .env.example              # Template variabel environment
├── package.json
└── README.md
```

---

## ⚙️ Persiapan & Instalasi

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Database PostgreSQL
Buka psql atau pgAdmin, lalu jalankan:
```sql
-- Buat database baru
CREATE DATABASE task_manager_db;

-- Hubungkan ke database
\c task_manager_db

-- Jalankan migration
\i database/migration.sql
```

### 3. Konfigurasi Environment
Salin file `.env.example` menjadi `.env` dan sesuaikan isinya:
```bash
cp .env.example .env
```

Isi file `.env`:
```
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=task_manager_db
DB_USER=postgres
DB_PASSWORD=your_password_here
```

### 4. Jalankan Aplikasi
```bash
# Mode development (dengan nodemon - auto-restart)
npm run dev

# Mode production
npm start
```

---

## 🛠️ Fitur Utama

### ✅ Middleware Logging Kustom
Setiap request yang masuk akan dicatat ke console dengan format:
```
[20/06/2024, 10:30:45] GET /tasks
[20/06/2024, 10:30:46] POST /tasks
```

### ✅ Validasi Input (Status 400)
`POST /tasks` dan `PUT /tasks/:id` akan menolak request jika `title` kosong atau hanya spasi:
```json
{
  "success": false,
  "message": "Validasi gagal: Field \"title\" tidak boleh kosong atau hanya berisi spasi"
}
```

### ✅ Error Handling (Status 404)
Jika ID tidak ditemukan di database:
```json
{
  "success": false,
  "message": "Tugas dengan ID 99 tidak ditemukan"
}
```

### ✅ Koneksi PostgreSQL via `pg`
Menggunakan `Pool` dari package `pg` untuk efisiensi koneksi.

### ✅ Running dengan `nodemon`
Gunakan `npm run dev` untuk auto-restart saat ada perubahan file.

---

## 📡 Daftar Endpoint

| Method | Endpoint      | Deskripsi                      |
|--------|---------------|-------------------------------|
| GET    | `/tasks`      | Mengambil semua tugas          |
| GET    | `/tasks/:id`  | Mengambil satu tugas by ID     |
| POST   | `/tasks`      | Menambah tugas baru            |
| PUT    | `/tasks/:id`  | Mengupdate tugas               |
| DELETE | `/tasks/:id`  | Menghapus tugas                |

---

## 📬 Contoh Request & Response

### GET /tasks
**Response 200:**
```json
{
  "success": true,
  "message": "Berhasil mengambil semua tugas",
  "total": 2,
  "data": [
    {
      "id": 1,
      "title": "Belajar Node.js",
      "description": "Pelajari konsep dasar Node.js",
      "is_completed": false,
      "created_at": "2024-06-20T03:30:00.000Z"
    }
  ]
}
```

### POST /tasks
**Request Body:**
```json
{
  "title": "Tugas Baru",
  "description": "Deskripsi tugas"
}
```
**Response 201:**
```json
{
  "success": true,
  "message": "Tugas berhasil ditambahkan",
  "data": {
    "id": 4,
    "title": "Tugas Baru",
    "description": "Deskripsi tugas",
    "is_completed": false,
    "created_at": "2024-06-20T03:35:00.000Z"
  }
}
```

**Response 400 (title kosong):**
```json
{
  "success": false,
  "message": "Validasi gagal: Field \"title\" tidak boleh kosong atau hanya berisi spasi"
}
```

### PUT /tasks/:id
**Request Body:**
```json
{
  "title": "Judul Diperbarui",
  "is_completed": true
}
```
**Response 200:**
```json
{
  "success": true,
  "message": "Tugas berhasil diperbarui",
  "data": { ... }
}
```

### DELETE /tasks/:id
**Response 200:**
```json
{
  "success": true,
  "message": "Tugas dengan ID 1 berhasil dihapus",
  "data": { ... }
}
```

**Response 404:**
```json
{
  "success": false,
  "message": "Tugas dengan ID 99 tidak ditemukan"
}
```

---

## 🗄️ Struktur Tabel PostgreSQL

```sql
CREATE TABLE tasks (
    id           SERIAL PRIMARY KEY,
    title        VARCHAR(255) NOT NULL,
    description  TEXT,
    is_completed BOOLEAN DEFAULT false,
    created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 📦 Dependencies

| Package   | Versi   | Fungsi                          |
|-----------|---------|---------------------------------|
| express   | ^4.18.2 | Framework web server            |
| pg        | ^8.11.3 | Client PostgreSQL untuk Node.js |
| dotenv    | ^16.3.1 | Manajemen variabel environment  |
| nodemon   | ^3.0.2  | Auto-restart saat development   |
