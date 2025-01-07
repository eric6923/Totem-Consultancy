import React from 'react';
import Img from '../home/assets/our-activities.png'
const Activities: React.FC = () => {
  return (
    <div className="text-center space-y-6">
      <h1 className="text-4xl text-gray-900 md:text-5xl font-bold mb-12">Our Activities</h1>
      <div className="mt-12 flex justify-center">
        <img 
          alt="Activity" 
          className="w-full object-cover rounded-xl" 
          src= {Img} 
        />
      </div>
    </div>
  );
};

export default Activities;
