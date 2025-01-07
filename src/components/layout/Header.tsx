import { Link } from 'react-router-dom';
import { useState } from 'react';
import LogoDesktop from '../home/assets/logo2.png';
import LogoMobile from '../home/assets/logo.png';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    setIsFormOpen(false);
  };

  return (
    <>
      <header className="absolute w-full z-40 py-4 px-6 bg-white md:bg-transparent">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <picture>
              <source media="(max-width: 768px)" srcSet={LogoMobile} />
              <img
                src={LogoDesktop}
                alt="Totem Logo"
                className="h-12 w-auto"
              />
            </picture>
          </Link>

          <button
            className="md:hidden text-gray-900 text-2xl"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            ☰
          </button>

          <div className="hidden md:flex items-center gap-8">
            <nav className="flex items-center gap-8">
              <Link to="/" className="text-white hover:text-gray-200 font-medium">
                Home
              </Link>
              <Link to="/about" className="text-white hover:text-gray-200 font-medium">
                About
              </Link>
              <Link to="/services" className="text-white hover:text-gray-200 font-medium">
                Services
              </Link>
              <Link to="/projects" className="text-white hover:text-gray-200 font-medium">
                Projects
              </Link>
              <Link to="/gallery" className="text-white hover:text-gray-200 font-medium">
                Gallery
              </Link>
              <Link to="/contact" className="text-white hover:text-gray-200 font-medium">
                Contact
              </Link>
            </nav>
            
            <button 
              onClick={() => setIsFormOpen(true)}
              className="bg-white text-gray-900 px-6 py-2.5 rounded hover:bg-gray-100 transition-colors font-medium"
            >
              Get Started
            </button>
          </div>

          {isMenuOpen && (
            <nav className="absolute top-16 left-0 w-full bg-white text-gray-900 shadow-md md:hidden flex flex-col items-center py-4 gap-4">
              <Link
                to="/"
                className="hover:text-gray-700 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/about"
                className="hover:text-gray-700 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="/services"
                className="hover:text-gray-700 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </Link>
              <Link
                to="/projects"
                className="hover:text-gray-700 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Projects
              </Link>
              <Link
                to="/gallery"
                className="hover:text-gray-700 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Gallery
              </Link>
              <Link
                to="/contact"
                className="hover:text-gray-700 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </nav>
          )}
        </div>
      </header>

      {/* Modal Overlay */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 h-[550px]  z-50 flex items-center justify-end p-4">
          <div className="bg-white rounded-lg max-w-md w-full relative">
            {/* Close Button */}
            <button
              onClick={() => setIsFormOpen(false)}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
            >
              ×
            </button>

            <form onSubmit={handleSubmit} className="p-4 mt-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm text-black mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-3 py-2 bg-gray-100 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-200 focus:border-transparent outline-none transition-all text-black"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm text-black mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-3 py-2 bg-gray-100 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-200 focus:border-transparent outline-none transition-all text-black"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="service" className="block text-sm text-black mb-1">
                    Service you are Interested in
                  </label>
                  <input
                    type="text"
                    id="service"
                    className="w-full px-3 py-2 bg-gray-100 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-200 focus:border-transparent outline-none transition-all text-black"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm text-black mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={3}
                    className="w-full px-3 py-2 bg-gray-100 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-200 focus:border-transparent outline-none transition-all text-black resize-none"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-black text-white px-6 py-2 text-lg font-medium rounded-lg hover:bg-gray-900 transition-colors"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}