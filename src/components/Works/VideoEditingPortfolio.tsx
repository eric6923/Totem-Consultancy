import v1 from './v1.png'
import v2 from './v2.png'
import { useEffect } from 'react';

const DualImageComponent = () => {
  useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
  return (
    <div className="w-full flex justify-center gap-16 p-4 mt-20 mb-20"> 
      <div className="w-[367px] h-[652px] relative">
        <img 
          src={v1} 
          alt="First image"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      <div className="w-[367px] h-[652px] relative">
        <img 
          src={v2}
          alt="Second image"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
    </div>
  );
};

export default DualImageComponent;