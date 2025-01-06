import p1 from '../Courses/assets/p1.png'
import p2 from '../Courses/assets/p2.png'
import p3 from '../Courses/assets/p3.png'
import p4 from '../Courses/assets/p4.png'
import { useEffect } from 'react'
interface CourseCardProps {
  title: string;
  duration: string;
  price: string;
  imageUrl: string;
}

interface Course {
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

const CourseGrid: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const courses: Course[] = [
    {
      title: 'Digital Marketing',
      duration: '6 Months Duration',
      price: 'Rs. 25,000/-',
      imageUrl: p1
    },
    {
      title: 'Graphics Design',
      duration: '6 Months Duration',
      price: 'Rs. 20,000/-',
      imageUrl: p2
    },
    {
      title: 'Video Editing',
      duration: '6 Months Duration',
      price: 'Rs. 35,000/-',
      imageUrl: p3
    },
    {
      title: 'Animation',
      duration: '6 Months Duration',
      price: 'Rs. 45,000/-',
      imageUrl: p4
    }
  ];

  return (
    <div style={{ backgroundColor: '#FDF8F3' }} className="min-h-screen w-full">
      <div className="max-w-6xl mx-auto p-8 " style={{ backgroundColor: '#FDF8F3' }}>
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
    </div>
  );
};

export default CourseGrid;