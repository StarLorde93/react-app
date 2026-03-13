const rateLimit = require("express-rate-limit")

const loginRateLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
  message: {
    success: false,
    message: "Too many login attempts. Try again later."
  },
  standardHeaders: true,
  legacyHeaders: false
})

module.exports = loginRateLimiter