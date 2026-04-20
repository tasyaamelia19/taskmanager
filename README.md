# Task Manager API
UTS Pemrograman Web 2 — Universitas Teknologi Bandung

## Teknologi
- Node.js + Express
- PostgreSQL (package `pg`)
- Nodemon (development)

## Struktur Project
```
task-manager/
├── config/
│   ├── db.js          # Koneksi PostgreSQL
│   └── schema.sql     # Query pembuatan tabel
├── middleware/
│   └── logger.js      # Middleware logging kustom
├── routes/
│   └── tasks.js       # Semua endpoint /tasks
├── index.js           # Entry point
├── package.json
└── README.md
```

## Cara Menjalankan

### 1. Install dependencies
```bash
npm install
```

### 2. Siapkan PostgreSQL
Buka pgAdmin atau terminal psql, lalu jalankan:
```sql
CREATE DATABASE task_manager_db;
```
Kemudian hubungkan ke `task_manager_db` dan jalankan isi file `config/schema.sql`.

### 3. Konfigurasi koneksi DB
Edit file `config/db.js`, sesuaikan `password` dengan password PostgreSQL kamu.

### 4. Jalankan server (dengan nodemon)
```bash
npm run dev
```

---

## Daftar Endpoint

| Method | Endpoint      | Deskripsi                        |
|--------|---------------|----------------------------------|
| GET    | /tasks        | Ambil semua tugas                |
| GET    | /tasks/:id    | Ambil satu tugas berdasarkan ID  |
| POST   | /tasks        | Tambah tugas baru                |
| PUT    | /tasks/:id    | Update tugas                     |
| DELETE | /tasks/:id    | Hapus tugas                      |

---

## Contoh Request

### POST /tasks
```json
{
  "title": "Belajar Memasak",
  "description": "Ayo Memasak"
}
```

### PUT /tasks/1
```json
{
  "is_completed": true
}
```

---

## Fitur
- ✅ Middleware Logging (method, URL, waktu)
- ✅ Validasi input title (status 400)
- ✅ Error handling ID tidak ditemukan (status 404)
- ✅ Koneksi PostgreSQL dengan package `pg`
- ✅ Running dengan `nodemon`
