import { Link } from 'react-router-dom';
import { useState } from 'react';
import LogoDesktop from '../home/assets/logo.png';
import LogoMobile from '../home/assets/logo.png';

export default function Header2() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="relative w-full z-50 py-4 px-6 bg-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo: Switch based on screen size */}
        <Link to="/" className="flex items-center gap-2">
          <picture>
            {/* Mobile Logo */}
            <source media="(max-width: 768px)" srcSet={LogoMobile} />
            {/* Desktop Logo */}
            <img
              src={LogoDesktop}
              alt="Totem Logo"
              className="h-12 w-auto"
            />
          </picture>
        </Link>

        {/* Hamburger Icon for Mobile */}
        <button
          className="md:hidden text-gray-900 text-2xl"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>

        {/* Desktop Navigation and Button */}
        <div className="hidden md:flex items-center gap-8">
          <nav className="flex items-center gap-8">
            <Link to="/" className="text-black hover:text-[#eac9a7] hover:underline font-medium">
              Home
            </Link>
            <Link to="/about" className="text-black hover:text-[#eac9a7] hover:underline font-medium">
              About
            </Link>
            <Link to="/services" className="text-black hover:text-[#eac9a7] hover:underline font-medium">
              Services
            </Link>
            <Link to="/projects" className="text-black hover:text-[#eac9a7] hover:underline font-medium">
              Projects
            </Link>
            <Link to="/gallery" className="text-black hover:text-[#eac9a7] hover:underline font-medium">
              Gallery
            </Link>
            <Link to="/contact" className="text-black hover:text-[#eac9a7] hover:underline font-medium">
              Contact
            </Link>
          </nav>
          
          {/* Desktop-only Get Started Button */}
          <Link 
            to="/contact" 
            className="bg-gray-900 text-white px-6 py-2.5 rounded hover:bg-gray-700 transition-colors font-medium"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="absolute top-16 left-0 w-full bg-white text-gray-900 shadow-md md:hidden flex flex-col items-center py-4 gap-4">
            <Link
              to="/"
              className="text-black hover:text-gray-700 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-black hover:text-gray-700 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/services"
              className="text-black hover:text-gray-700 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              to="/projects"
              className="text-black hover:text-gray-700 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Projects
            </Link>
            <Link
              to="/gallery"
              className="text-black hover:text-gray-700 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Gallery
            </Link>
            <Link
              to="/contact"
              className="text-black hover:text-gray-700 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
