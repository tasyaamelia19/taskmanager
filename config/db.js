const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'task_manager_db',
  user: 'postgres',
  password: 't4sy4', // Ganti dengan password PostgreSQL kamu
});

pool.connect((err, client, release) => {
  if (err) {
    console.error('❌ Gagal koneksi ke PostgreSQL:', err.message);
  } else {
    console.log('✅ Berhasil terhubung ke PostgreSQL');
    release();
  }
});

module.exports = pool;
