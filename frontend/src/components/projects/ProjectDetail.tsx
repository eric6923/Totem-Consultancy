import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface ProjectImage {
  id: string;
  imageUrl: string;
  title?: string;
  description?: string;
}

const ProjectDetail = () => {
  const { id } = useParams();
  const [images, setImages] = useState<ProjectImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchProjectImages();
  }, [id]);

  const fetchProjectImages = async () => {
    try {
      const response = await fetch(`https://totem-consultancy-alpha.vercel.app/api/categories/${id}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          // Add any authentication headers if required
          // 'Authorization': 'Bearer your-token-here',
        },
        credentials: 'include', // Include credentials if needed
      });

      // Log the response for debugging
      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      if (response.status === 403) {
        throw new Error('Access forbidden. Please check your authentication.');
      }

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(`Failed to fetch project images: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Fetched data:', data); // Log the data for debugging
      setImages(Array.isArray(data) ? data : [data]); // Handle both array and single object responses
    } catch (err) {
      console.error('Detailed error:', err);
      setError(err instanceof Error ? err.message : 'Failed to load project images. Please try again later.');
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
            onClick={fetchProjectImages}
            className="mt-4 px-6 py-2 border border-black hover:bg-black hover:text-white transition-colors duration-300"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#FDF8F3] py-16">
      <div className="max-w-[1200px] mx-auto px-4">
        {images.length === 0 ? (
          <div className="text-center text-gray-600">
            No images found for this project.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {images.map((image, index) => (
              <div 
                key={image.id || index}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={image.imageUrl}
                    alt={image.title || 'Project image'}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      console.error('Image failed to load:', image.imageUrl);
                      e.currentTarget.src = '/placeholder-image.jpg'; // Add a placeholder image
                    }}
                  />
                </div>
                {(image.title || image.description) && (
                  <div className="p-4">
                    {image.title && (
                      <h3 className="text-xl font-semibold mb-2">{image.title}</h3>
                    )}
                    {image.description && (
                      <p className="text-gray-600">{image.description}</p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectDetail;