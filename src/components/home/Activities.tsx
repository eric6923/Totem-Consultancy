import React from 'react';
import Img from '../home/assets/our-activities.png'

const Activities: React.FC = () => {
  return (
    <div className="text-center space-y-6 bg-[#FDF8F3] px-4 md:px-0">
      <h1 className="text-4xl md:text-5xl lg:text-5xl text-[47px] text-gray-800 font-semibold font-open-sans mb-8 md:mb-12">
        Our Activities
      </h1>
      <div className="mt-8 md:mt-12 flex justify-center w-full md:w-[1500px] mx-auto">
        <img 
          alt="Activity" 
          className="w-full md:w-[1500px] h-auto md:h-[1000px] object-cover rounded-xl" 
          src={Img}
        />
      </div>
    </div>
  );
};

export default Activities;