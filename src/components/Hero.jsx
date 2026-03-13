function Hero() {
  return (
    <section className="bg-gray-100 py-28">

      <div className="max-w-6xl mx-auto text-center px-6">

        <h1 className="text-5xl font-bold text-gray-800 mb-6">
          Build Modern Websites with React
        </h1>

        <p className="text-lg text-gray-600 mb-10">
          This website is being built step by step while learning React and modern web development.
        </p>

        <div className="space-x-4">

          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Get Started
          </button>

          <button className="px-6 py-3 border border-gray-400 rounded-lg hover:bg-gray-200">
            Learn More
          </button>

        </div>

      </div>

    </section>
  )
}

export default Hero