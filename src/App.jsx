import { BrowserRouter, Routes, Route } from "react-router-dom"

import Navbar from "./components/Navbar"
import Footer from "./components/Footer"

import Home from "./pages/Home"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Admin from "./pages/Admin"
import Login from "./pages/Login"

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />

      </Routes>

      <Footer />

    </BrowserRouter>
  )
}

export default App