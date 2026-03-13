import { useEffect, useState } from "react"
import Hero from "../components/Hero"
import Features from "../components/Features"

function Home() {

  const [message, setMessage] = useState("")

  useEffect(() => {

    fetch(`${import.meta.env.VITE_API_URL}/api/message`)
      .then(res => res.json())
      .then(data => setMessage(data.message))

  }, [])

  return (
    <div>

      <Hero />

      <div className="text-center py-10 text-blue-600 font-semibold">
        {message}
      </div>

      <Features />

    </div>
  )
}

export default Home