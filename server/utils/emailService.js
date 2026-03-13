const { Resend } = require("resend")

const resend = new Resend(process.env.RESEND_API_KEY)

const sendContactNotification = async (name, email, message) => {

  await resend.emails.send({
    from: "Website <onboarding@resend.dev>",
    to: process.env.ADMIN_EMAIL,
    subject: "New Contact Form Message",
    html: `
      <h3>New message received</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `
  })

}

const sendAutoReply = async (name, email) => {

  await resend.emails.send({
    from: "Website <onboarding@resend.dev>",
    to: email,
    subject: "We received your message",
    html: `
      <h3>Hello ${name}</h3>
      <p>Thank you for contacting us.</p>
      <p>We received your message and will get back to you shortly.</p>
    `
  })

}

module.exports = {
  sendContactNotification,
  sendAutoReply
}