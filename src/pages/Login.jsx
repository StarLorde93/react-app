import { useState } from "react"

function Login() {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async (e) => {

    e.preventDefault()

    const res = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    })

    const data = await res.json()

    if (data.token) {

      localStorage.setItem("token", data.token)

      window.location.href = "/admin"

    } else {

      alert("Login failed")

    }

  }

  return (

    <div className="max-w-md mx-auto py-20">

      <h1 className="text-3xl font-bold mb-6">Admin Login</h1>

      <form onSubmit={handleLogin} className="space-y-4">

        <input
          placeholder="Username"
          value={username}
          onChange={(e)=>setUsername(e.target.value)}
          className="w-full border p-3"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          className="w-full border p-3"
        />

        <button className="w-full bg-blue-600 text-white py-3">
          Login
        </button>

      </form>

    </div>

  )

}

export default Login