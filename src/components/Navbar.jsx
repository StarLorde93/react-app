import { Link } from "react-router-dom"

function Navbar() {

  const token = localStorage.getItem("token")

  return (
    <nav className="flex justify-between items-center px-10 py-4 bg-white shadow">

      <h2 className="text-2xl font-bold text-gray-800">
        MyWebsite
      </h2>

      <div className="space-x-6 text-gray-600">

        <Link to="/" className="hover:text-blue-600">Home</Link>
        <Link to="/about" className="hover:text-blue-600">About</Link>
        <Link to="/contact" className="hover:text-blue-600">Contact</Link>

        {!token && (
          <Link to="/login" className="hover:text-blue-600">
            Admin Login
          </Link>
        )}

        {token && (
          <Link to="/admin" className="hover:text-blue-600">
            Dashboard
          </Link>
        )}

      </div>

    </nav>
  )
}

export default Navbar