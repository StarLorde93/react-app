import { useEffect, useState } from "react"

function Admin() {

  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)

  const token = localStorage.getItem("token")

  useEffect(() => {

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

    <div className="max-w-6xl mx-auto py-20 px-6">

      <h1 className="text-4xl font-bold mb-10 text-center">
        Contact Messages
      </h1>

      {contacts.length === 0 ? (
        <p className="text-center text-gray-500">
          No messages yet
        </p>
      ) : (

        <div className="overflow-x-auto">

          <table className="w-full border border-gray-200 rounded-lg overflow-hidden">

            <thead className="bg-gray-100">

              <tr className="text-left">

                <th className="p-4 border">Name</th>
                <th className="p-4 border">Email</th>
                <th className="p-4 border">Message</th>
                <th className="p-4 border">Date</th>
                <th className="p-4 border text-center">Action</th>

              </tr>

            </thead>

            <tbody>

              {contacts.map(contact => (

                <tr key={contact._id} className="border-t">

                  <td className="p-4 border">{contact.name}</td>

                  <td className="p-4 border">
                    <a
                      href={`mailto:${contact.email}`}
                      className="text-blue-600 underline"
                    >
                      {contact.email}
                    </a>
                  </td>

                  <td className="p-4 border">{contact.message}</td>

                  <td className="p-4 border text-sm text-gray-600">
                    {new Date(contact.createdAt).toLocaleString()}
                  </td>

                  <td className="p-4 border text-center">

                    <button
                      onClick={() => deleteMessage(contact._id)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      )}

    </div>

  )

}

export default Admin