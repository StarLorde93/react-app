import Navbar from "./components/Navbar"
import Footer from "./components/Footer"

import Home from "./pages/Home"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Admin from "./pages/Admin"
import Login from "./pages/Login"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

function App() {
  return (
    <Router>

      <Navbar />

      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/login" element={<Login />} />

      </Routes>

      <Footer />

    </Router>
  )
}

export default App