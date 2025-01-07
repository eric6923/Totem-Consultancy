import React from "react";
import { useNavigate } from "react-router-dom";

// Import images
import marketingImg from '../home/Courses/assets/digital.png';
import graphicsDesignImg from '../home/Courses/assets/graphics.png';
import videoImg from '../home/Courses/assets/media.png';
import planningImg from '../home/Courses/assets/Planing 1.png';
import animationImg from '../home/Courses/assets/animation.png';
import empathizeImg from '../home/Courses/assets/courses.png';

interface Service {
  title: string;
  description: string;
  items: string[];
  image: any;
  path: string;
}

const Service: React.FC = () => {
  const navigate = useNavigate();

  const services: Service[] = [
    {
      title: "Digital Marketing",
      description:
        "By leveraging data-driven strategies and cutting-edge technology, we can maximize reach & engagement. Our digital marketing experts specialize in driving conversions more efficiently than traditional methods.",
      items: [
        "Branding & Logo",
        "Content Marketing",
        "SEO & Google Ads (PPC)",
        "Social Media Marketing",
        "Lead Generation",
        "Affiliate Marketing",
      ],
      image: marketingImg,
      path: "/digital",
    },
    // ... rest of the services array remains the same
  ];

  const handleExplore = (path: string) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {services.map((service, index) => (
          <div key={index} className="mb-24 last:mb-0">
            <div 
              className={`flex flex-col ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              } items-center gap-12`}
            >
              <div className="lg:w-1/2">
                <img
                  src={service.image}
                  alt={`${service.title} illustration`}
                  className="w-full max-w-lg mx-auto"
                />
              </div>
              <div className="lg:w-1/2">
                <h2 className="text-2xl md:text-3xl font-semibold mb-6">
                  {service.title}
                </h2>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  {service.description}
                </p>
                <ul 
                  className="grid grid-cols-2 gap-3 mb-8 sm:block sm:space-y-3" 
                  aria-label={`${service.title} features`}
                >
                  {service.items.map((item, idx) => (
                    <li 
                      key={idx} 
                      className="flex items-center text-gray-700"
                      aria-label={item}
                    >
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-3 shrink-0"></span>
                      {item}
                    </li>
                  ))}
                </ul>
                <button 
                  className="bg-black text-white px-8 py-2.5 rounded-md hover:bg-gray-800 transition-colors"
                  aria-label={`Explore more about ${service.title}`}
                  onClick={() => handleExplore(service.path)}
                >
                  Explore more
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Service;
