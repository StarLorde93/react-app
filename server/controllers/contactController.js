const Contact = require("../models/Contact")

const {
  sendContactNotification,
  sendAutoReply
} = require("../utils/emailService")

// ---------------- SUBMIT CONTACT FORM ----------------

exports.submitContact = async (req, res, next) => {

  try {

    const { name, email, message } = req.body

    const contact = new Contact({
      name,
      email,
      message
    })

    await contact.save()

    // Send email to admin
    await sendContactNotification(name, email, message)

    // Send auto reply to user
    await sendAutoReply(name, email)

    res.json({
      success: true,
      message: "Message sent successfully"
    })

  } catch (error) {

    next(error)

  }

}


// ---------------- GET ALL CONTACT MESSAGES ----------------

exports.getMessages = async (req, res, next) => {

  try {

    const messages = await Contact.find()
      .sort({ createdAt: -1 })

    res.json({
      success: true,
      data: messages
    })

  } catch (error) {

    next(error)

  }

}


// ---------------- DELETE MESSAGE ----------------

exports.deleteMessage = async (req, res, next) => {

  try {

    const { id } = req.params

    await Contact.findByIdAndDelete(id)

    res.json({
      success: true,
      message: "Message deleted"
    })

  } catch (error) {

    next(error)

  }

}