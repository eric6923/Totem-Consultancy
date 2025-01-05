import { Brain, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Brain className="w-8 h-8" />
              <span className="text-xl font-bold">TOTEM</span>
            </Link>
            <div className="flex flex-col gap-2">
              <a href="mailto:totemmanagement@gmail.com" className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                totemmanagement@gmail.com
              </a>
              <a href="mailto:info@totemservices.org" className="flex items-center gap-2">
                info@totemservices.org
              </a>
              <a href="tel:+918278416000" className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                +91 82784 16000, +91 93508 51909
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Page</h3>
            <nav className="flex flex-col gap-2">
              <Link to="/" className="hover:text-gray-300">Home</Link>
              <Link to="/about" className="hover:text-gray-300">About</Link>
              <Link to="/services" className="hover:text-gray-300">Services</Link>
              <Link to="/projects" className="hover:text-gray-300">Projects</Link>
              <Link to="/gallery" className="hover:text-gray-300">Gallery</Link>
              <Link to="/contact" className="hover:text-gray-300">Contact</Link>
            </nav>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Our Address</h3>
            <p className="flex items-start gap-2">
              <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
              SCO 10A, Manjha Market, Near Lakshman Chowk, Birala Mandir, Kurukshetra, Haryana
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-sm">
          <p>© 2024 - Totem Management & Consultancy</p>
          <div className="flex justify-center gap-4 mt-4">
            <Link to="/" className="hover:text-gray-300">Home</Link>
            <Link to="/team" className="hover:text-gray-300">Team</Link>
            <Link to="/privacy" className="hover:text-gray-300">Privacy & Policy</Link>
            <Link to="/contact" className="hover:text-gray-300">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}