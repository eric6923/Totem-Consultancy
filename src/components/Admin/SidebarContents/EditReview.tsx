import React, { useState } from 'react';
import { Pencil, Trash2, Plus, X } from 'lucide-react';
import r1 from '../assets/assets/r1.png'
import r2 from '../assets/assets/r2.png'
import r3 from '../assets/assets/r3.png'
import { useDropzone } from 'react-dropzone';

interface Review {
  id: number;
  name: string;
  content: string;
  image: string;
}

interface NewReview {
  name: string;
  content: string;
  image: string;
}

const EditReview: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 1,
      name: "Khushi",
      content: "Learning digital marketing here was a game-changer for my career. The practical approach and expert guidance helped me land a great job in the industry.",
      image: r3
    },
    {
      id: 2,
      name: "Aemporter",
      content: "Their digital marketing strategies have significantly boosted our online presence and customer engagement. We’re thrilled with themeasurable results and growth they’ve delivered.",
      image: r2
    },
    {
      id: 3,
      name: "Matrix",
      content: "Working with their team has been an incredible experience. They understood our needs perfectly and executed campaigns thatexceeded our expectations",
      image: r1
    },
    
  ]);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [newReview, setNewReview] = useState<NewReview>({
    name: "",
    content: "",
    image: "/api/placeholder/128/128"
  });

  const handleDelete = (id: number): void => {
    setReviews(reviews.filter(review => review.id !== id));
  };

  const handleEdit = (review: Review): void => {
    setEditingReview(review);
    setNewReview({
      name: review.name,
      content: review.content,
      image: review.image
    });
    setIsModalOpen(true);
  };

  const handleAdd = (): void => {
    setEditingReview(null);
    setNewReview({
      name: "",
      content: "",
      image: "/api/placeholder/128/128"
    });
    setIsModalOpen(true);
  };

  const handleSave = (): void => {
    if (editingReview) {
      setReviews(reviews.map(review =>
        review.id === editingReview.id 
          ? { ...review, ...newReview }
          : review
      ));
    } else {
      const newReviewWithId: Review = {
        ...newReview,
        id: Date.now()
      };
      setReviews([...reviews, newReviewWithId]);
    }
    setIsModalOpen(false);
    setNewReview({
      name: "",
      content: "",
      image: "/api/placeholder/128/128"
    });
    setEditingReview(null);
  };
  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = () => {
      setNewReview({ ...newReview, image: reader.result as string });
    };
    reader.readAsDataURL(file);
  };
  const { getRootProps, getInputProps } = useDropzone({ onDrop });


  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto bg-black/5">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-16">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-blue-600">Manage Reviews</h1>
          <p className="text-sm sm:text-base text-gray-600 mt-2">Add, edit, or remove testimonials</p>
        </div>
        <button
          onClick={handleAdd}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/20"
        >
          <Plus className="w-5 h-5" />
          Add Review
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map(review => (
          <div key={review.id} className="relative bg-gradient-to-b from-black to-blue-900 mt-16 p-6 rounded-2xl w-full sm:w-[370px] h-[280px] shadow-xl hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 border border-blue-900/20">
            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
              <div className="w-32 h-32 rounded-full border-4 border-blue-600 p-1 bg-black">
                <img
                  alt={review.name}
                  className="w-full h-full rounded-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  src={review.image}
                />
              </div>
            </div>
            <div className="absolute top-2 sm:top-4 right-2 sm:right-4 flex gap-1 sm:gap-2">
              <button
                onClick={() => handleEdit(review)}
                className="p-1.5 sm:p-2 text-blue-400 hover:text-blue-300 transition-colors"
                title="Edit review"
              >
                <Pencil className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
              <button
                onClick={() => handleDelete(review.id)}
                className="p-1.5 sm:p-2 text-blue-400 hover:text-red-400 transition-colors"
                title="Delete review"
              >
                <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            </div>
            <div className="mt-16 text-center">
              <h3 className="text-lg sm:text-xl font-semibold uppercase text-blue-400">{review.name}</h3>
              <p className="mt-4 text-sm sm:text-sm text-gray-300 leading-relaxed">{review.content}</p>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gradient-to-b from-black to-blue-900 rounded-2xl p-8 w-full max-w-md relative border border-blue-900/20">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-blue-400 hover:text-blue-300 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold text-blue-400 mb-6">
              {editingReview ? 'Edit Review' : 'Add New Review'}
            </h2>
            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-blue-300 mb-2">
                  Name
                </label>
                <input
                  id="name"
                  className="w-full px-4 py-3 bg-black/50 text-white rounded-lg border border-blue-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200"
                  value={newReview.name}
                  onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                  placeholder="Enter reviewer's name"
                />
              </div>
              <div>
                <label htmlFor="content" className="block text-sm font-medium text-blue-300 mb-2">
                  Review Content
                </label>
                <textarea
                  id="content"
                  className="w-full px-4 py-3 bg-black/50 text-white rounded-lg border border-blue-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200 min-h-[120px]"
                  value={newReview.content}
                  onChange={(e) => setNewReview({ ...newReview, content: e.target.value })}
                  placeholder="Enter review content"
                />
              </div>
              <div>
      <label className="block text-sm font-medium text-blue-300 mb-2">
        Upload Image
      </label>
      <div
        {...getRootProps()}
        className="w-full px-4 py-6 bg-black/50 text-white rounded-lg border border-dashed border-blue-900 hover:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200 flex items-center justify-center cursor-pointer"
      >
        <input {...getInputProps()} />
        <p className="text-sm text-blue-300">
          Drag & drop an image here, or <span className="text-blue-500 underline">click to select</span>
        </p>
      </div>
    </div>
              <div className="flex justify-end gap-4 mt-8">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2.5 text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/20"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditReview;