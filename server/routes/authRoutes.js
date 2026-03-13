const express = require("express")

const router = express.Router()

const {
  createAdmin,
  loginAdmin
} = require("../controllers/authController")

const {
  validateLogin
} = require("../middleware/validateRequest")

const loginRateLimiter = require("../middleware/loginRateLimiter")

// Create first admin
router.post("/create-admin", validateLogin, createAdmin)

// Admin login
router.post(
  "/login",
  loginRateLimiter,
  validateLogin,
  loginAdmin
)

module.exports = router