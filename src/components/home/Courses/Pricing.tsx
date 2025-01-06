import React, { useEffect } from 'react';
import p1 from '../Courses/assets/p1.png';
import p2 from '../Courses/assets/p2.png';
import p3 from '../Courses/assets/p3.png';
import p4 from '../Courses/assets/p4.png';
import b1 from '../Courses/assets/b1.png';
import b2 from '../Courses/assets/b2.png';
import b3 from '../Courses/assets/b3.png';
import b4 from '../Courses/assets/b4.png';

interface CourseCardProps {
  title: string;
  duration: string;
  price: string;
  imageUrl: string;
}

const CourseCard: React.FC<CourseCardProps> = ({ title, duration, price, imageUrl }) => (
  <div className="w-[370px] h-[326px] bg-white p-6 flex flex-col items-center justify-center shadow-sm">
    <div className="w-[266px] h-[252px] flex flex-col items-center space-y-6">
      <div className="w-[130px] h-[130px] flex items-center justify-center">
        <img
          src={imageUrl}
          alt={title}
          className="w-[130px] h-[130px] object-contain"
        />
      </div>
      <div className="text-center space-y-3">
        <h3 className="text-2xl font-semibold text-black">{title}</h3>
        <p className="text-lg text-gray-600">({duration})</p>
        <p className="text-xl font-medium text-black">{price}</p>
      </div>
    </div>
  </div>
);

interface AnimationCardProps {
  icon: string;
  title: string;
  description: string;
}

const AnimationCard: React.FC<AnimationCardProps> = ({ icon, title, description }) => (
  <div className="w-full md:w-[595px] h-auto md:h-[340px] bg-[#FDF8F3] border-2 border-gray-300 rounded-tr-3xl p-4 md:p-6 relative group hover:bg-white hover:scale-105 transition-transform duration-300 mt-12 md:mt-5">
    <div className="w-24 h-24 md:w-36 md:h-36 rounded-full bg-[#F6DCAB] absolute top-0 left-1/2 transform -translate-x-1/2 -mt-12 md:-mt-20 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
      <img
        alt={`${title} Icon`}
        className="w-14 h-14 object-cover transform transition-transform duration-300"
        src={icon}
      />
    </div>
    <h3 className="text-2xl md:text-4xl font-semibold text-center mt-16">
      {title}
    </h3>
    <p className="text-base md:text-lg text-gray-800 text-center mt-4 md:mt-8">
      {description}
    </p>
  </div>
);

const CourseGrid: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const courses = [
    {
      title: 'Digital Marketing',
      duration: '6 Months Duration',
      price: 'Rs. 25,000/-',
      imageUrl: p1,
    },
    {
      title: 'Graphics Design',
      duration: '6 Months Duration',
      price: 'Rs. 20,000/-',
      imageUrl: p2,
    },
    {
      title: 'Video Editing',
      duration: '6 Months Duration',
      price: 'Rs. 35,000/-',
      imageUrl: p3,
    },
    {
      title: 'Animation',
      duration: '6 Months Duration',
      price: 'Rs. 45,000/-',
      imageUrl: p4,
    },
  ];

  const animationServices = [
    {
      icon: b1,
      title: 'Offline Coaching',
      description:
        'Learn well in offline classes at Totem - Digital Marketing company in Kurukshetra with advance equipments and systems. A face to face interaction with teachers.',
    },
    {
      icon: b2,
      title: 'Certification',
      description:
        'Upon completing the course, you may receive industry-recognized certifications that can enhance your career opportunities.',
    },
    {
      icon: b3,
      title: 'Updated Content',
      description:
        'Totem is expected to continually update its course content to keep pace with the fast-evolving landscape of digital marketing.',
    },
    {
      icon: b4,
      title: 'Ongoing Support',
      description:
        'Totem might offer continuous support and mentorship following the completion of the course.',
    },
  ];

  return (
    <div style={{ backgroundColor: '#FDF8F3' }} className="min-h-screen w-full">
      {/* Course Cards Section */}
      <div className="max-w-6xl mx-auto p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-items-center">
          {courses.map((course, index) => (
            <CourseCard key={index} {...course} />
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <button className="bg-gray-800 text-white px-6 py-2 rounded hover:bg-gray-700 transition-colors">
            Contact Now
          </button>
        </div>
      </div>

      {/* Animation Services Section */}
      <div className="container px-4 md:px-20 mt-24">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
          Why Choose Us !
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-16 md:gap-y-32 mb-16 ">
          {animationServices.map((service, index) => (
            <AnimationCard key={index} {...service} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseGrid;
