import React from 'react';
import Img1 from '../projects/assets/project1.png';
import Img2 from '../projects/assets/project2.png';

interface Project {
  id: number;
  title: string;
  image: string;
}

const PortfolioShowcase: React.FC = () => {
  const projects: Project[] = [
    {
      id: 1,
      title: "Graphics Design",
      image: Img1,
    },
    {
      id: 2,
      title: "Video Editing",
      image: Img2,
    },
    {
      id: 3,
      title: "Animation",
      image: Img2,
    },
    {
      id: 4,
      title: "Gaming",
      image: Img2,
    },
    {
      id: 5,
      title: "Event Management",
      image: Img2,
    },
    {
      id: 6,
      title: "Home Deco",
      image: Img2,
    },
  ];

  return (
    // Change your outermost div to this:
<div className="w-[100vw] min-h-screen bg-[#FDF8F3] -mx-8 -mt-8 -mb-8 overflow-x-hidden">
<div className="max-w-[1000px] mx-auto px-4 py-12">
    {/* Rest of your code stays exactly the same */}
      {/* Header Section */}
      <div className="text-center mb-20">
        <h1 className="text-[2.8rem] md:text-[3.8rem] font-bold leading-tight mt-14">
          Transforming Visions
          <br />
          into Reality
        </h1>
        <p className="text-gray-700 text-lg mt-5 max-w-2xl mx-auto">
          Discover the experiences of our clients and how we've made an impact on their projects.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-16 justify-items-center mb-28">
        {projects.map((project) => (
          <div
            key={project.id}
            className="flex flex-col items-center p-6 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            {/* Project Image Container */}
            <div className="w-[320px] h-[225px] mb-6 overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Project Title */}
            <h2 className="text-2xl font-semibold mb-5">{project.title}</h2>

            {/* View Button */}
            <button
              className="w-[290px] py-3 border border-black hover:bg-black hover:text-white transition-colors duration-300"
              onClick={() => console.log(`Viewing ${project.title}`)}
            >
              View
            </button>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default PortfolioShowcase;
