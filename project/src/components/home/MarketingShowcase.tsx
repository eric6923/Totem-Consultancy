import { CheckSquare } from 'lucide-react';
import Img1 from '../home/assets/hero-image-1.png';
import Img2 from '../home/assets/hero-image-2.png';
import Img3 from '../home/assets/hero-image-3.png';
import Img4 from '../home/assets/hero-image-4.png';

const MarketingShowcase = () => {
  const features = [
    'Get Start with us',
    'Get high quality content',
    'Reach to maximum audience.',
  ];

  const marketingItems = [
    {
      image: Img1,
      alt: "Sports Dance Day"
    },
    {
      image: Img2,
      alt: "Shake Mix"
    },
    {
      image: Img3,
      alt: "Pizza Offer"
    },
    {
      image: Img4,
      alt: "Food Special"
    }
  ];

  return (
    <div className="min-h-screen bg-[#FFF8F0] flex items-center justify-center">
      <div className="flex flex-col lg:flex-row items-stretch gap-4 w-full max-w-[1200px] mx-auto px-4">
        {/* Left Section */}
        <div className="w-full lg:w-[48%] bg-[#F6DCAB] rounded-lg p-10 flex flex-col h-[590px]">
          <div className="flex flex-col justify-center h-full py-8">
            <div className="space-y-6">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-snug">
                Empower Your Brand With Our Result Driven Digital Marketing Agency
              </h1>
              
              <p className="text-base text-gray-700">
                Strategies those can empower your brand
                and reach to maximum audience.
              </p>

              <ul className="space-y-5 pt-8">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckSquare className="h-6 w-6 text-gray-800 flex-shrink-0" />
                    <span className="text-lg text-gray-800">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full lg:w-[48%] grid grid-cols-2 gap-4 h-[600px]">
          {marketingItems.map((item, index) => (
            <div key={index} className="h-[270px]">
              <img
                src={item.image}
                alt={item.alt}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarketingShowcase;