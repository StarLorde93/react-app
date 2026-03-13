import { FaBolt, FaRocket, FaLayerGroup } from "react-icons/fa"

function Features() {
  return (
    <section className="py-24 bg-white">

      <div className="max-w-6xl mx-auto px-6 text-center">

        <h2 className="text-3xl font-bold text-gray-800 mb-12">
          Features
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="p-8 border rounded-xl shadow hover:shadow-lg transition">

            <FaBolt className="text-blue-600 text-4xl mx-auto mb-4" />

            <h3 className="text-xl font-semibold mb-4">Fast</h3>

            <p className="text-gray-600">
              React applications are fast and efficient.
            </p>

          </div>

          <div className="p-8 border rounded-xl shadow hover:shadow-lg transition">

            <FaRocket className="text-blue-600 text-4xl mx-auto mb-4" />

            <h3 className="text-xl font-semibold mb-4">Modern</h3>

            <p className="text-gray-600">
              Built using modern tools like React and Tailwind.
            </p>

          </div>

          <div className="p-8 border rounded-xl shadow hover:shadow-lg transition">

            <FaLayerGroup className="text-blue-600 text-4xl mx-auto mb-4" />

            <h3 className="text-xl font-semibold mb-4">Scalable</h3>

            <p className="text-gray-600">
              Easily expandable into large applications.
            </p>

          </div>

        </div>

      </div>

    </section>
  )
}

export default Features