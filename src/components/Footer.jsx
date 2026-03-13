function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">

      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">

        <div>
          <h2 className="text-white text-xl font-bold mb-4">
            MyWebsite
          </h2>

          <p className="text-gray-400">
            A modern website built using React and Tailwind CSS.
          </p>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4">
            Links
          </h3>

          <ul className="space-y-2">
            <li className="hover:text-white cursor-pointer">Home</li>
            <li className="hover:text-white cursor-pointer">About</li>
            <li className="hover:text-white cursor-pointer">Contact</li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4">
            Contact
          </h3>

          <p>Email: contact@example.com</p>
          <p>Location: India</p>
        </div>

      </div>

      <div className="text-center text-gray-500 mt-10">
        © 2026 MyWebsite. All rights reserved.
      </div>

    </footer>
  )
}

export default Footer