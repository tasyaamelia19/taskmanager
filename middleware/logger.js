// middleware/logger.js
// Middleware kustom untuk mencatat setiap HTTP request yang masuk

const logger = (req, res, next) => {
  const method = req.method;
  const url = req.originalUrl;
  const time = new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' });

  console.log(`[${time}] ${method} ${url}`);

  next(); // Lanjutkan ke handler berikutnya
};

module.exports = logger;
