import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface CategoryImage {
  imageUrl: string;
  name: string;
}

const ProjectDetail = () => {
  const { id } = useParams();
  const [categoryData, setCategoryData] = useState<CategoryImage | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('Current ID:', id);
    fetchCategoryData();
  }, [id]);

  const fetchCategoryData = async () => {
    try {
      // Simple GET request without any headers
      const response = await fetch(`https://totem-consultancy-alpha.vercel.app/api/categories/${id}`);
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch category data: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('API Response:', data);

      setCategoryData(data);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err instanceof Error ? err.message : 'Failed to load category data');
    } finally {
      setIsLoading(false);
    }
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
            onClick={fetchCategoryData}
            className="mt-4 px-6 py-2 border border-black hover:bg-black hover:text-white transition-colors duration-300"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!categoryData) {
    return (
      <div className="w-full min-h-screen bg-[#FDF8F3] flex items-center justify-center">
        <div className="text-center text-gray-600">
          <p>No category data found.</p>
          <p className="mt-2 text-sm">Category ID: {id}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#FDF8F3] py-16">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="bg-white rounded-lg overflow-hidden shadow-md">
          <div className="aspect-[16/9] overflow-hidden">
            <img
              src={categoryData.imageUrl}
              alt={categoryData.name}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                console.error('Image failed to load:', categoryData.imageUrl);
                e.currentTarget.src = '/placeholder-image.jpg';
              }}
            />
          </div>
          <div className="p-4">
            <h2 className="text-xl font-semibold">{categoryData.name}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;