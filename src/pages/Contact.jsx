import { useState } from "react"
import ReCAPTCHA from "react-google-recaptcha"

function Contact() {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [captchaToken, setCaptchaToken] = useState(null)

  const handleSubmit = async (e) => {

    e.preventDefault()

    if (loading) return

    // validation
    if (!name || !email || !message) {
      alert("Please fill all fields")
      return
    }

    if (!email.includes("@")) {
      alert("Please enter a valid email")
      return
    }

    if (!captchaToken) {
      alert("Please complete the captcha")
      return
    }

    try {

      setLoading(true)

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          email,
          message,
          captchaToken
        })
      })

      const data = await response.json()

      if (!response.ok) {
        alert(data.message || "Failed to send message")
        return
      }

      alert("Message sent successfully!")

      setName("")
      setEmail("")
      setMessage("")
      setCaptchaToken(null)

    } catch (error) {

      console.error(error)
      alert("Something went wrong")

    } finally {

      setLoading(false)

    }

  }

  return (

    <section className="py-24">

      <div className="max-w-xl mx-auto">

        <h1 className="text-4xl font-bold text-center mb-10">
          Contact Us
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">

          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            className="w-full border p-3 rounded"
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            className="w-full border p-3 rounded"
            required
          />

          <textarea
            placeholder="Message"
            value={message}
            onChange={(e)=>setMessage(e.target.value)}
            className="w-full border p-3 rounded"
            rows="5"
            required
          />

          <ReCAPTCHA
            sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
            onChange={(token) => setCaptchaToken(token)}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>

        </form>

      </div>

    </section>

  )

}

export default Contact