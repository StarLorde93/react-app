import { useEffect, useState } from "react"

function Admin() {

  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)

  const token = localStorage.getItem("token")

  useEffect(() => {

    // redirect to login if no token
    if (!token) {
      window.location.href = "/login"
      return
    }

    fetchContacts()

  }, [])

  const fetchContacts = async () => {

    try {

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/contacts`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      const data = await res.json()

      setContacts(data)

    } catch (error) {

      console.error(error)
      alert("Failed to load messages")

    } finally {

      setLoading(false)

    }

  }

  const deleteMessage = async (id) => {

    const confirmDelete = window.confirm("Delete this message?")

    if (!confirmDelete) return

    try {

      await fetch(`${import.meta.env.VITE_API_URL}/api/contact/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      fetchContacts()

    } catch (error) {

      console.error(error)
      alert("Failed to delete message")

    }

  }

  if (loading) {
    return (
      <div className="text-center py-20 text-xl">
        Loading messages...
      </div>
    )
  }

  return (

    <div className="max-w-4xl mx-auto py-20">

      <h1 className="text-4xl font-bold mb-10 text-center">
        Contact Messages
      </h1>

      <div className="space-y-6">

        {contacts.length === 0 && (
          <p className="text-center text-gray-500">
            No messages yet
          </p>
        )}

        {contacts.map(contact => (

          <div key={contact._id} className="border p-6 rounded-lg shadow">

            <p><b>Name:</b> {contact.name}</p>
            <p><b>Email:</b> {contact.email}</p>
            <p><b>Message:</b> {contact.message}</p>

            <button
              onClick={() => deleteMessage(contact._id)}
              className="mt-4 bg-red-600 text-white px-4 py-2 rounded"
            >
              Delete
            </button>

          </div>

        ))}

      </div>

    </div>

  )

}

export default Admin