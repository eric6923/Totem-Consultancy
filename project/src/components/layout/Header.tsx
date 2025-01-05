import { Brain } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-white py-4 px-6 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Brain className="w-8 h-8" />
          <span className="text-xl font-bold">TOTEM</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className="hover:text-gray-600">Home</Link>
          <Link to="/about" className="hover:text-gray-600">About</Link>
          <Link to="/services" className="hover:text-gray-600">Services</Link>
          <Link to="/projects" className="hover:text-gray-600">Projects</Link>
          <Link to="/gallery" className="hover:text-gray-600">Gallery</Link>
          <Link to="/contact" className="hover:text-gray-600">Contact</Link>
        </nav>

        <Link 
          to="/contact" 
          className="bg-gray-900 text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-colors"
        >
          Get Started
        </Link>
      </div>
    </header>
  );
}