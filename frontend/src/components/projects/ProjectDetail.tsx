import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

interface Project {
  id: string;
  mediaUrl: string;
  categoryId: string;
  category: {
    id: string;
    name: string;
    imageUrl: string;
  };
}

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`https://totem-consultancy-alpha.vercel.app/api/projects/${id}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch project');
        }

        const data = await response.json();
        setProject(data);
      } catch (err) {
        setError('Failed to load project');
        console.error('Error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      console.log('Fetching project with ID:', id);
      fetchProject();
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="w-full min-h-screen bg-[#FDF8F3] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="w-full min-h-screen bg-[#FDF8F3] flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || 'Project not found'}</p>
          <button 
            onClick={() => navigate('/projects')}
            className="px-6 py-2 bg-black text-white hover:bg-gray-800 transition-colors duration-300"
          >
            Back to Projects
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#FDF8F3] py-16">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="mb-6">
          <button 
            onClick={() => navigate('/projects')}
            className="px-6 py-2 border border-black hover:bg-black hover:text-white transition-colors duration-300"
          >
            ← Back to Projects
          </button>
        </div>

        <div className="bg-white rounded-lg overflow-hidden shadow-lg">
          <div className="aspect-[16/9] relative overflow-hidden">
            <img
              src={project.mediaUrl}
              alt={`Project by ${project.category.name}`}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
          
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-2">{project.category.name}</h1>
            <p className="text-gray-600">Category: {project.category.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;