import React, { useState } from 'react';
import { X } from 'lucide-react';
import whatsapp from "./whatsapp.png";



const WhatsAppButton = () => {
  const [showChat, setShowChat] = useState(true);
  
  const handleWhatsAppClick = () => {
    window.open("https://wa.me/918278416000?text=Hey,%20is%20anyone%20available%20for%20a%20chat?%20I%20need%20to%20know%20about%20your%20services", "_blank");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {showChat && (
        <div className="relative inline-flex items-center">
          <a 
            className="bg-white md:px-4 md:py-2 px-3 py-1 rounded-2xl border-black border-1 shadow-[3px_3px_0_#22c55e]"
            href="https://wa.me/918278416000?text=Hey,%20is%20anyone%20available%20for%20a%20chat?%20I%20need%20to%20know%20about%20your%20services."
          >
            Chat with us
          </a>
          <button
            onClick={() => setShowChat(false)}
            className="ml-2 bg-black rounded-full p-1 text-white hover:bg-gray-200 transition-colors"
            aria-label="Close chat prompt"
          >
            <X size={16} />
          </button>
        </div>
      )}
      <div className='text-right'>
        <button
          onClick={handleWhatsAppClick}
          className="transition-all duration-300 mt-3 hover:scale-110"
          aria-label="Contact us on WhatsApp"
        >
          <img src={whatsapp} alt="WhatsApp Icon" className="w-12 h-12" />
        </button>
      </div>
    </div>
  );
};

export default WhatsAppButton;