import { useRef, useEffect, useState } from "react";
import video from "../home/assets/loading.mp4";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
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
      <div className="relative z-10 w-full min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
          <div className="max-w-3xl mt-0 lg:mt-16 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="block lg:hidden">
                We Empower<br />
                Brands and<br />
                Individuals
              </span>
              <span className="hidden lg:block">
                We Empower Brands and Individuals
              </span>
            </h1>
            <div className="text-base sm:text-lg text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0">
              <p className="lg:hidden">
                A one-stop shop for the solution of<br />
                Digital Marketing, Content Creation,<br />
                Graphics, Animation, and Customized<br />
                Courses that demonstrate individuals and brands.
              </p>
              <p className="hidden lg:block">
                A one-stop shop for the solution of Digital Marketing, Content Creation, 
                Graphics, Animation, and Customized Courses that demonstrate individuals and brands.
              </p>
            </div>
            <div className="flex justify-center lg:justify-start">
              <button
                onClick={() => setShowForm(true)}
                className="bg-[#E6D5B9] text-black px-6 sm:px-8 py-2.5 sm:py-3 text-lg sm:text-xl lg:text-lg font-medium shadow-md hover:bg-[#d4c3a7] transition-colors rounded-lg"
                style={{ boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      {showForm && (
        <div className="fixed top-1/2 right-0 -translate-y-1/2 h-[550px] w-full lg:w-[400px] bg-white z-20 overflow-y-auto transition-transform duration-300 transform rounded-l-lg">
          <button 
            onClick={() => setShowForm(false)}
            className="absolute top-4 right-4 text-black hover:text-gray-600"
          >
            ✕
          </button>
          <form className="p-4 mt-10">
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
      )}
    </div>
  );
}