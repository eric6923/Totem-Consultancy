import digitalMarketingImg from "../home/assets/digitalmarketing.gif";
import graphicsDesignImg from "../home/assets/graphic.gif";
import mediaProductionImg from "../home/assets/media.gif";
import Animate from "../home/assets/animation2.gif";
import { Link } from 'react-router-dom';

const courses = [
  {
    title: "Digital Marketing",
    description:
      "Boost your online presence with our Digital Marketing Course. Learn to craft strategies that engage your audience and drive measurable success across various platforms.",
    image: digitalMarketingImg,
  },
  {
    title: "Graphics Design",
    description:
      "Unlock your creativity with our Graphics Design Course. Master design principles to create visually appealing content that captures attention and communicates effectively.",
    image: graphicsDesignImg,
  },
  {
    title: "Video Editing",
    description:
      "Transform raw footage into compelling stories with our Video Editing Course. Learn the tools and techniques to craft engaging videos that captivate viewers.",
    image: mediaProductionImg,
  },
  {
    title: "Animation",
    description:
      "Bring ideas to life with our Animation Course. Learn to create visually stunning animations that captivate audiences and communicate your message effectively.",
    image: Animate,
  },
];


const Course = () => {
  return (
    <div className="bg-[#FDF8F3] min-h-screen py-16">
      <div className="max-w-[1280px] mx-auto px-4"> {/* Changed from container to max-w-[1400px] */}
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Courses</h1>
          <p className="text-xl text-gray-600">
            Enhance your skills with our customized courses
          </p>
        </div>

        {/* Course Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-16 gap-x-4">
          {courses.map((course, index) => (
            <div
              key={index}
              className="bg-white border-2 border-gray-300 rounded-2xl text-center overflow-hidden p-8 max-w-xl mx-auto"
            >
              {/* Image */}
              <div className="relative w-full h-52 flex justify-center items-center overflow-hidden">
                <img
                  alt={course.title}
                  className="w-52 h-52 object-contain"
                  src={course.image}
                />
              </div>
              {/* Content */}
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-gray-900">
                  {course.title}
                </h3>
                <p className="mt-4 text-gray-700">{course.description}</p>
                <Link 
  to="/courses"
  className="mt-6 bg-[#343434] text-white font-semibold px-6 py-2 rounded-2xl inline-block"
>
  View Pricing
</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Course;