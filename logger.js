// src/middleware/logger.js

/**
 * Middleware Logging Kustom
 * Mencetak metode HTTP, URL, dan waktu ke console
 * setiap kali ada request masuk
 */
const logger = (req, res, next) => {
  const method = req.method;
  const url = req.originalUrl;
  const waktu = new Date().toLocaleString('id-ID', {
    timeZone: 'Asia/Jakarta',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  console.log(`[${waktu}] ${method} ${url}`);

  next();
};

module.exports = logger;
