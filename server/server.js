require("dotenv").config()

const errorHandler = require("./middleware/errorHandler")
const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const helmet = require("helmet")
const rateLimit = require("express-rate-limit")

const contactRoutes = require("./routes/contactRoutes")
const authRoutes = require("./routes/authRoutes")

const app = express()

// ---------------- SECURITY ----------------

app.use(helmet())

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
})

app.use(limiter)

// ---------------- CORS ----------------

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://react-app-plum-xi.vercel.app"
    ],
    methods: ["GET", "POST", "DELETE"],
    credentials: true
  })
)

// ---------------- BODY PARSER ----------------

app.use(express.json())

// ---------------- DATABASE ----------------

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err))

// ---------------- ROUTES ----------------

app.use("/api/contact", contactRoutes)
app.use("/api/auth", authRoutes)

// ---------------- TEST ROUTE ----------------

app.get("/api/message", (req, res) => {
  res.json({ message: "Backend working correctly" })
})

// ---------------- ERROR HANDLER ----------------

app.use(errorHandler)

// ---------------- SERVER ----------------

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})