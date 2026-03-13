const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")

const app = express()

app.use(cors())
app.use(express.json())

// ---------------- DATABASE CONNECTION ----------------

mongoose.connect("mongodb://admin:1234admin@ac-qea0e1h-shard-00-00.qsmrhn9.mongodb.net:27017,ac-qea0e1h-shard-00-01.qsmrhn9.mongodb.net:27017,ac-qea0e1h-shard-00-02.qsmrhn9.mongodb.net:27017/WebsiteCaptures?ssl=true&replicaSet=atlas-10t450-shard-0&authSource=admin&appName=mySumDatabase")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err))

// ---------------- DATABASE MODEL ----------------

const ContactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String
})

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

// Save contact form
app.post("/api/contact", async (req, res) => {

  const { name, email, message } = req.body

  const newContact = new Contact({
    name,
    email,
    message
  })

  await newContact.save()

  res.json({ message: "Message saved to database!" })

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

app.listen(5000, () => {
  console.log("Server running on port 5000")
})