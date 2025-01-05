import React from 'react';

// Importing images
import digitalMarketingImg from '../home/assets/digitalmarketing.gif'
import graphicsDesignImg from '../home/assets/graphic.gif'
import mediaProductionImg from '../home/assets/media.gif'
import uiUxDesignImg from '../home/assets/ui.gif'
import animationImg from '../home/assets/animation.gif'
import customizedCoursesImg from '../home/assets/courses.gif'

interface ServiceCardProps {
  title: string;
  description: string;
  image: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, image }) => (
  <div className="bg-[#343434] rounded-2xl text-center overflow-hidden shadow-lg">
    <div className="relative w-full h-56 bg-white rounded-t-2xl flex justify-center items-center overflow-hidden">
      {/* Displaying the image */}
      <img src={image} alt={title} className="w-56 h-56 object-contain" />

    </div>
    <div className="p-6 text-white">
      <h3 className="text-2xl font-semibold">{title}</h3>
      <p className="mt-4">{description}</p>
      <button className="mt-6 bg-white text-black font-semibold px-6 py-2 rounded-2xl">
        Explore Now
      </button>
    </div>
  </div>
);

const services = [
  {
    title: 'Digital Marketing',
    description: 'Boost your brand\'s online presence with our data-driven digital marketing strategies, including SEO, SMM, etc.',
    image: digitalMarketingImg,
  },
  {
    title: 'Graphics Design',
    description: 'Transform your ideas into stunning visuals. Our designs effectively communicate your brand\'s message.',
    image: graphicsDesignImg,
  },
  {
    title: 'Media Production',
    description: 'Enhance your footage with our professional video editing services, delivering polished, engaging content.',
    image: mediaProductionImg,
  },
  {
    title: 'UI/UX Design',
    description: 'Design accessible and visually appealing interfaces. We create designs that enhance user satisfaction.',
    image: uiUxDesignImg,
  },
  {
    title: 'Animation (2D & 3D)',
    description: 'Bring ideas to life with our engaging and visually stunning animations that captivate and inform.',
    image: animationImg,
  },
  {
    title: 'Customized Courses',
    description: 'We design tailored educational experiences that engage learners and meet specific skill development needs.',
    image: customizedCoursesImg,
  },
];

const Services: React.FC = () => {
  return (
    <div className="bg-[#F6DCAB] py-12 px-6">
      <div className="text-center space-y-6">
        <h1 className="text-4xl text-gray-900 md:text-5xl font-bold">
          What We Provide
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        {services.slice(0, 3).map((service, index) => (
          <ServiceCard
            key={index}
            title={service.title}
            description={service.description}
            image={service.image}
          />
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        {services.slice(3).map((service, index) => (
          <ServiceCard
            key={index + 3}
            title={service.title}
            description={service.description}
            image={service.image}
          />
        ))}
      </div>
    </div>
  );
};

export default Services;
