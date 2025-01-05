import React from 'react';
import r1 from '../home/assets/r1.png'
import r2 from '../home/assets/r2.png'
import r3 from '../home/assets/r3.png'

import i1 from '../home/assets/i1.png'
import i2 from '../home/assets/i2.png'
import i3 from '../home/assets/i3.png'
import i4 from '../home/assets/i4.png'

const Testimonials: React.FC = () => {
  return (
    <div className="py-12 px-6">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold mb-24 text-gray-900">Read what others have to say</h1>
      </div>
      
      <div className="flex flex-col sm:flex-row justify-center gap-6 mt-12">
        <div className="relative bg-[#343434] mt-10 p-6 rounded-xl w-full sm:w-1/3">
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
            <img alt="Khushi" className="w-24 h-24 rounded-full object-cover grayscale" src={r3} />
          </div>
          <div className="mt-16 text-center text-white">
            <h3 className="text-xl font-semibold uppercase">Khushi</h3>
            <p className="mt-4 text-sm">Learning digital marketing here was a game-changer for my career. The practical approach and expert guidance helped me land a great job in the industry.</p>
          </div>
        </div>

        <div className="relative bg-[#343434] mt-10 p-6 rounded-xl w-full sm:w-1/3">
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
            <img alt="Aemporter" className="w-24 h-24 rounded-full object-cover grayscale" src={r2} />
          </div>
          <div className="mt-16 text-center text-white">
            <h3 className="text-xl font-semibold uppercase">Aemporter</h3>
            <p className="mt-4 text-sm">Their digital marketing strategies have significantly boosted our online presence and customer engagement. We’re thrilled with the measurable results and growth they’ve delivered.</p>
          </div>
        </div>

        <div className="relative bg-[#343434] mt-10 p-6 rounded-xl w-full sm:w-1/3">
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
            <img alt="Matrix" className="w-24 h-24 rounded-full object-cover grayscale" src={r1} />
          </div>
          <div className="mt-16 text-center text-white">
            <h3 className="text-xl font-semibold uppercase">Matrix</h3>
            <p className="mt-4 text-sm">Working with their team has been an incredible experience. They understood our needs perfectly and executed campaigns that exceeded our expectations.</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-center items-center lg:justify-evenly gap-6 mt-32">
        <img alt="Image 1" className="h-24 object-cover rounded-lg mt-3" src={i1} />
        <img alt="Image 2" className="w-24 h-24 object-cover rounded-lg mt-3" src={i2} />
        <img alt="Image 3" className="h-24 object-cover rounded-lg mt-3" src={i3} />
        <img alt="Image 4" className="h-24 object-cover rounded-lg mt-3" src={i4} />
      </div>
    </div>
  );
};

export default Testimonials;
