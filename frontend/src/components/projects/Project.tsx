import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Project {
  id: string;
  imageUrl: string;
  name: string;
  timePeriod?: string;
  price?: number;
}

const PortfolioShowcase = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch('https://totem-consultancy-alpha.vercel.app/api/categories');
      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }
      const data = await response.json();
      setProjects(data);
    } catch (err) {
      setError('Failed to load projects. Please try again later.');
      console.error('Error fetching projects:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClick = (projectId: string) => {
    navigate(`/project/${projectId}`);
  };

  if (isLoading) {
    return (
      <div className="w-full min-h-screen bg-[#FDF8F3] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full min-h-screen bg-[#FDF8F3] flex items-center justify-center">
        <div className="text-red-600 text-center p-4">
          <p className="text-xl">{error}</p>
          <button 
            onClick={fetchProjects}
            className="mt-4 px-6 py-2 border border-black hover:bg-black hover:text-white transition-colors duration-300"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#FDF8F3] -mt-8 -mb-8">
      <div className="max-w-[1000px] mx-auto px-4 py-12">
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

        <div className="grid grid-cols-1 gap-20 md:grid-cols-2 md:gap-8 lg:grid-cols-3 lg:gap-12 justify-items-center mb-28">
          {projects.map((project) => (
            <div
              key={project.id}
              className="flex flex-col items-center md:p-6 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow w-full max-w-[320px]"
            >
              <div className="w-full aspect-[320/225] mb-6 overflow-hidden">
                <img
                  src={project.imageUrl}
                  alt={project.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <h2 className="text-2xl font-semibold mb-5">{project.name}</h2>
              {project.timePeriod && (
                <p className="text-gray-600 mb-3">{project.timePeriod}</p>
              )}
              {project.price && (
                <p className="text-gray-800 font-medium mb-5">
                  ${project.price.toLocaleString()}
                </p>
              )}

              <button
                className="w-full max-w-[290px] py-3 border border-black hover:bg-black hover:text-white transition-colors duration-300"
                onClick={() => handleClick(project.id)}
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