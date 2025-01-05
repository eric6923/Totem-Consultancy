import { Link } from 'react-router-dom';
import Logo from '../home/assets/logo2.png'
export default function Header() {
  return (
    <header className="absolute w-full z-50 py-4 px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img 
            src={Logo} 
            alt="Totem Logo" 
            className="h-12 w-auto"
          />
        </Link>
        
        <nav className="hidden md:flex items-center gap-8">
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

        <Link 
          to="/contact" 
          className="bg-white text-gray-900 px-6 py-2.5 rounded hover:bg-gray-100 transition-colors font-medium"
        >
          Get Started
        </Link>
      </div>
    </header>
  );
}