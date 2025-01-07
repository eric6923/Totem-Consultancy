

const ContactForm = () => {
  return (
    <div className="w-full min-h-screen" style={{
      background: 'radial-gradient(circle at center, #F6DCAB3B 0%, #F6DCAB3B 15%, #3434343B 40%)',
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}>
      <div className="container mx-auto px-4 py-20">
        <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto">
          {/* Right Container - Contact Information - Now First on Mobile */}
          <div className="w-full md:w-[574px] order-1 md:order-2 p-8 rounded-lg text-white" style={{ backgroundColor: '#343434' }}>
            <h2 className="text-4xl font-light mb-6">Let's Talk</h2>
            <p className="mb-8 text-gray-300">
              Have some big idea or brand to develop and need help? Then reach out we'd love to hear about your project and provide help.
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-light mb-2">Email</h3>
                <p className="text-gray-300">totem@services.org</p>
              </div>

              <div>
                <h3 className="text-xl font-light mb-2">Address</h3>
                <p className="text-gray-300">
                  SCO 10A, Manjha Market, Near Lakshman Chowk,Birala Mandir, Kurukshetra, Haryana
                </p>
              </div>

              <div>
                <h3 className="text-xl font-light mb-2">Social</h3>
                <div className="flex space-x-4">
                  <a href="#" className="text-white hover:text-gray-300">
                    <span className="sr-only">Google</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/>
                    </svg>
                  </a>
                  <a href="https://x.com/totemmangement?t=3EEwzPWxyVaHfKPDIz3Qzw&s=09" className="text-white hover:text-gray-300">
                    <span className="sr-only">Twitter</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </a>
                  <a href="https://www.instagram.com/totem_management_consultancy/profilecard/?igsh=MWwxMjQwNTl2bXk3dw==" className="text-white hover:text-gray-300">
                    <span className="sr-only">Instagram</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-white hover:text-gray-300">
                    <span className="sr-only">LinkedIn</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Left Container - Contact Form - Now Second on Mobile */}
          <div className="w-full md:w-[571px] order-2 md:order-1 bg-white p-8 rounded-lg shadow-md">
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                />
              </div>

              <div>
                <label htmlFor="service" className="block text-sm font-medium text-gray-700">
                  Service you are interested in
                </label>
                <input
                  type="text"
                  id="service"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      {/* Footer */}
<footer className="text-black bg-white md:text-white md:bg-[#343434]">
  <div className="container mx-auto px-4 py-4">
    {/* Mobile-first approach with flex column */}
    <div className="flex flex-col items-center md:flex-row md:justify-between md:h-[131px]">
      {/* Navigation Links - On top for mobile */}
      <div className="flex flex-wrap justify-center gap-6 mb-4 md:mb-0 md:order-2">
        <a href="#" className="text-sm text-gray-700 hover:text-gray-900 md:text-gray-300 md:hover:text-white transition duration-300">
          Home
        </a>
        <a href="#" className="text-sm text-gray-700 hover:text-gray-900 md:text-gray-300 md:hover:text-white transition duration-300">
          Team
        </a>
        <a href="#" className="text-sm text-gray-700 hover:text-gray-900 md:text-gray-300 md:hover:text-white transition duration-300">
          Privacy & Policy
        </a>
        <a href="#" className="text-sm text-gray-700 hover:text-gray-900 md:text-gray-300 md:hover:text-white transition duration-300">
          Contact
        </a>
      </div>

      {/* Copyright - Below links for mobile */}
      <div className="text-sm text-gray-600 text-center md:text-gray-300 md:order-1">
        © 2025 - Totem Management & Consultancy
      </div>
    </div>
  </div>
</footer>

    </div>
  );
};

export default ContactForm;