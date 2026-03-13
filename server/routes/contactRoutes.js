const express = require("express")

const router = express.Router()

const {
  submitContact,
  getMessages,
  deleteMessage
} = require("../controllers/contactController")

const authMiddleware = require("../middleware/authMiddleware")

const {
  validateContact
} = require("../middleware/validateRequest")

// Public route (contact form)
router.post("/", validateContact, submitContact)

// Admin routes (protected)
router.get("/messages", authMiddleware, getMessages)

router.delete("/:id", authMiddleware, deleteMessage)

module.exports = router