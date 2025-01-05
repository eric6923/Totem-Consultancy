import { useRef, useEffect } from 'react';
import video from '../home/assets/loading.mp4'
export default function Hero() {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log("Video autoplay failed:", error);
      });
    }
  }, []);

  return (
    <div className="relative bg-black text-white min-h-screen flex items-center">
      {/* Video Background */}
      <video 
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-50"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
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
}