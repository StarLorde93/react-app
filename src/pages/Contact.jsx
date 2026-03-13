import { useState } from "react"

function Contact() {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    const response = await fetch("http://localhost:5000/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        email,
        message
      })
    })

    const data = await response.json()

    alert(data.message)

    setName("")
    setEmail("")
    setMessage("")
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

          <button className="w-full bg-blue-600 text-white py-3 rounded">
            Send Message
          </button>

        </form>

      </div>

    </section>
  )
}

export default Contact