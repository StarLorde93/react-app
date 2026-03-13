import { useEffect, useState } from "react"

function Admin() {

  const [contacts, setContacts] = useState([])

  const token = localStorage.getItem("token")

  const fetchContacts = () => {

    fetch("http://localhost:5000/api/contacts", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => setContacts(data))

  }

  useEffect(() => {
    fetchContacts()
  }, [])

  const deleteMessage = async (id) => {

    await fetch(`http://localhost:5000/api/contact/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    fetchContacts()

  }

  return (

    <div className="max-w-4xl mx-auto py-20">

      <h1 className="text-4xl font-bold mb-10 text-center">
        Contact Messages
      </h1>

      <div className="space-y-6">

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