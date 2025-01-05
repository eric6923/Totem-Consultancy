import { Link } from 'react-router-dom';
import Logo from '../home/assets/logo2.png';

// VideoBackground component to handle the video
const VideoBackground = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full z-0 overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute min-w-full min-h-full object-cover"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}
      >
        <source src="/path-to-your-video.mp4" type="video/mp4" />
      </video>
      {/* Optional overlay to ensure text readability */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
    </div>
  );
};

// Updated Header component
const Header = () => {
  return (
    <header className="relative z-50 py-4 px-6">
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
};

// Updated Hero component
const Hero = () => {
  return (
    <div className="relative z-10 text-white min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="max-w-3xl mt-16">
          <h1 className="text-7xl font-bold mb-6 leading-tight">
            We Empower Brands and Individuals
          </h1>
          <div className="text-lg text-gray-300 mb-8 max-w-2xl">
            <p>A one-stop shop for the solution of Digital Marketing,</p>
            <p>Content Creation, Graphics, Animation, and Customized</p>
            <p>Courses that demonstrate individuals and brands.</p>
          </div>
          <button
            className="bg-[#E6D5B9] text-black px-6 py-2.5 text-lg font-medium shadow-md hover:bg-[#d4c3a7] transition-colors rounded-lg"
            style={{ boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

// Main layout component that combines everything
const Layout = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <VideoBackground />
      <div className="relative z-10">
        <Header />
        <Hero />
      </div>
    </div>
  );
};

export default Layout;