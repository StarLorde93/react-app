const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const Admin = require("../models/Admin")

// ---------------- CREATE ADMIN ----------------
// Run this once to create the first admin

exports.createAdmin = async (req, res, next) => {
  try {

    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" })
    }

    const existingAdmin = await Admin.findOne({ email })

    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const admin = new Admin({
      email,
      password: hashedPassword
    })

    await admin.save()

    res.json({ message: "Admin created successfully" })

  } catch (error) {
    next(error)
  }
}


// ---------------- LOGIN ADMIN ----------------

exports.loginAdmin = async (req, res, next) => {

  try {

    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" })
    }

    const admin = await Admin.findOne({ email })

    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" })
    }

    const isMatch = await bcrypt.compare(password, admin.password)

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" })
    }

    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    )

    res.json({
      token,
      admin: {
        id: admin._id,
        email: admin.email
      }
    })

  } catch (error) {
    next(error)
  }

}