require("dotenv").config()

const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const helmet = require("helmet")
const rateLimit = require("express-rate-limit")
const { Resend } = require("resend")
const axios = require("axios")

const app = express()

// ---------------- SECURITY ----------------

app.use(helmet())

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
})

app.use(limiter)

// ---------------- SERVICES ----------------

const resend = new Resend(process.env.RESEND_API_KEY)

// ---------------- MIDDLEWARE ----------------

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://react-app-plum-xi.vercel.app"
  ],
  methods: ["GET", "POST", "DELETE"],
  credentials: true
}))

app.use(express.json())

// ---------------- DATABASE CONNECTION ----------------

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err))

// ---------------- DATABASE MODEL ----------------

const ContactSchema = new mongoose.Schema(
{
  name: String,
  email: String,
  message: String
},
{
  timestamps: true
}
)

const Contact = mongoose.model("Contact", ContactSchema)

// ---------------- ADMIN LOGIN CONFIG ----------------

const ADMIN_USER = "admin"
const ADMIN_PASS = "admin123"
const SECRET_KEY = "mysecretkey"

// ---------------- ROUTES ----------------

// Test API
app.get("/api/message", (req, res) => {
  res.json({ message: "Hello from Node.js backend!" })
})

// ---------------- CONTACT FORM ----------------

app.post("/api/contact", async (req, res) => {

  const { name, email, message, captchaToken } = req.body

  try {

    // verify captcha FIRST
    const verify = await axios.post(
      "https://www.google.com/recaptcha/api/siteverify",
      null,
      {
        params: {
          secret: process.env.RECAPTCHA_SECRET,
          response: captchaToken
        }
      }
    )

    if (!verify.data.success) {
      return res.status(400).json({ message: "Captcha failed" })
    }

    // save message
    const newContact = new Contact({
      name,
      email,
      message
    })

    await newContact.save()

    // send email
    await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: process.env.EMAIL,
      subject: "New Contact Form Message",
      html: `
        <h2>New Message</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b></p>
        <p>${message}</p>
      `
    })

    res.json({ message: "Message saved to database!" })

  } catch (error) {

    console.error(error)
    res.status(500).json({ message: "Server error" })

  }

})

// ---------------- LOGIN ROUTE ----------------

app.post("/api/login", (req, res) => {

  const { username, password } = req.body

  if (username === ADMIN_USER && password === ADMIN_PASS) {

    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" })

    return res.json({ token })

  }

  res.status(401).json({ message: "Invalid credentials" })

})

// ---------------- PROTECTED ADMIN ROUTE ----------------

app.get("/api/contacts", async (req, res) => {

  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(403).json({ message: "No token provided" })
  }

  const token = authHeader.split(" ")[1]

  try {

    jwt.verify(token, SECRET_KEY)

    const contacts = await Contact.find()

    res.json(contacts)

  } catch {

    res.status(401).json({ message: "Invalid token" })

  }

})

// ---------------- DELETE MESSAGE ----------------

app.delete("/api/contact/:id", async (req, res) => {

  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(403).json({ message: "No token provided" })
  }

  const token = authHeader.split(" ")[1]

  try {

    jwt.verify(token, SECRET_KEY)

    const id = req.params.id

    await Contact.findByIdAndDelete(id)

    res.json({ message: "Message deleted successfully" })

  } catch {

    res.status(401).json({ message: "Invalid token" })

  }

})

// ---------------- SERVER START ----------------

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})