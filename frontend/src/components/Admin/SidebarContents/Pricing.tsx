import { useState } from "react";
import { Pencil, Trash2, Plus, X } from "lucide-react";
import { useDropzone } from "react-dropzone";

interface TeamMember {
  id: number;
  name: string;
  timePeriod: string;
  price: string;
  imageUrl: string;
}

interface newReview {
  name: string;
  timePeriod: string;
  price: string;
  imageUrl: string;
}

const TeamMemberComponent = () => {
  const [members, setMembers] = useState<TeamMember[]>([
    {
      id: 1,
      name: "Animation",
      timePeriod: "(6 Months Duration)",
      price: "₹ 25000",
      imageUrl: "/api/placeholder/128/128",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [newReview, setNewReview] = useState<newReview>({
    name: "",
    timePeriod: "",
    price: "",
    imageUrl: "/api/placeholder/128/128",
  });

  const handleDelete = (id: number): void => {
    setMembers(members.filter((member) => member.id !== id));
  };

  const handleEdit = (member: TeamMember): void => {
    setEditingMember(member);
    setNewReview({
      name: member.name,
      timePeriod: member.timePeriod,
      price: member.price,
      imageUrl: member.imageUrl,
    });
    setIsModalOpen(true);
  };

  const handleAdd = (): void => {
    setEditingMember(null);
    setNewReview({
      name: "",
      timePeriod: "",
      price: "",
      imageUrl: "/api/placeholder/128/128",
    });
    setIsModalOpen(true);
  };

  const handleSave = async (): Promise<void> => {
    try {
      // Log the data being sent for debugging
      console.log('Sending data:', {
        courseName: newReview.name,
        duration: newReview.timePeriod,
        price: newReview.price,
        imageUrl: newReview.imageUrl
      });
  
      const response = await fetch('https://totem-consultancy-alpha.vercel.app/api/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          courseName: newReview.name,
          duration: newReview.timePeriod,
          price: newReview.price,
          imageUrl: newReview.imageUrl
        })
      });
  
      if (!response.ok) {
        const errorData = await response.text();
        console.error('Server response error:', errorData);
        throw new Error(`Server responded with status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('Response from server:', data);
  
      // Update local state with the new member
      const newReviewWithId: TeamMember = {
        id: data.id || Date.now(),
        name: newReview.name,
        timePeriod: newReview.timePeriod,
        price: newReview.price,
        imageUrl: newReview.imageUrl
      };
  
      setMembers(prevMembers => [...prevMembers, newReviewWithId]);
      setIsModalOpen(false);
      
      // Reset the form
      setNewReview({
        name: "",
        timePeriod: "",
        price: "",
        imageUrl: "/api/placeholder/128/128",
      });
      setEditingMember(null);
  
    } catch (error) {
      console.error('Error saving course:', error);
      // You might want to add some error handling UI here
      alert('Failed to save course. Please try again.');
    }
  };

  const onDrop = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    console.log('Selected File:', file); // Debugging log
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'ml_default'); // Replace with your Cloudinary upload preset
  
    try {
      const response = await fetch('https://api.cloudinary.com/v1_1/dgagkq1cs/image/upload', {
        method: 'POST',
        body: formData,
      });
  
      console.log('Response Status:', response.status, response.statusText); // Debugging log
  
      if (response.ok) {
        const data = await response.json();
        console.log('Cloudinary URL:', data.secure_url); // Console log the Cloudinary link
        setNewReview({ ...newReview, imageUrl: data.secure_url });
      } else {
        console.error('Error uploading file to Cloudinary. Response:', await response.text());
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto bg-black/5">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-16">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-blue-600">
            Manage Pricing
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mt-2">
            Add, edit, or remove Pricing Details
          </p>
        </div>
        <button
          onClick={handleAdd}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/20"
        >
          <Plus className="w-5 h-5" />
          Add Logs
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {members.map((member) => (
          <div
            key={member.id}
            className="relative bg-gradient-to-b from-black to-blue-900 mt-16 p-6 rounded-2xl w-full sm:w-[290px] h-[210px] shadow-xl hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 border border-blue-900/20"
          >
            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
              <div className="w-32 h-32 rounded-full border-4 border-blue-600 p-1 bg-black">
                <img
                  alt={member.name}
                  className="w-full h-full rounded-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  src={member.imageUrl}
                />
              </div>
            </div>
            <div className="absolute top-2 sm:top-4 right-3 sm:right-1 flex gap-2">
              <button
                onClick={() => handleEdit(member)}
                className="p-1.5 sm:p-2 text-blue-400 hover:text-blue-300 transition-colors"
                title="Edit member"
              >
                <Pencil className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button
                onClick={() => handleDelete(member.id)}
                className="p-1.5 sm:p-2 text-blue-400 hover:text-red-400 transition-colors"
                title="Delete member"
              >
                <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

            <div className="mt-16 text-center">
              <h3 className="text-lg sm:text-xl font-semibold uppercase text-blue-400">
                {member.name}
              </h3>
              <p className="mt-2 text-sm sm:text-base text-gray-300 leading-relaxed">
                {member.timePeriod}
              </p>
              <p className="mt-2 text-sm sm:text-base text-gray-300 leading-relaxed">
                {member.price}
              </p>
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
              {editingMember ? "Edit Pricing" : "Add New pricing"}
            </h2>
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-blue-300 mb-2"
                >
                  Course Name
                </label>
                <input
                  id="name"
                  className="w-full px-4 py-3 bg-black/50 text-white rounded-lg border border-blue-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200"
                  value={newReview.name}
                  onChange={(e) =>
                    setNewReview({ ...newReview, name: e.target.value })
                  }
                  placeholder="Enter Course name"
                />
              </div>
              <div>
                <label
                  htmlFor="timePeriod"
                  className="block text-sm font-medium text-blue-300 mb-2"
                >
                  Duration
                </label>
                <input
                  id="timePeriod"
                  className="w-full px-4 py-3 bg-black/50 text-white rounded-lg border border-blue-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200"
                  value={newReview.timePeriod}
                  onChange={(e) =>
                    setNewReview({ ...newReview, timePeriod: e.target.value })
                  }
                  placeholder="Enter Duration"
                />
              </div>
              <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-blue-300 mb-2"
                >
                  Price
                </label>
                <input
                  id="price"
                  className="w-full px-4 py-3 bg-black/50 text-white rounded-lg border border-blue-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200"
                  value={newReview.price}
                  onChange={(e) =>
                    setNewReview({ ...newReview, price: e.target.value })
                  }
                  placeholder="Enter Price"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-blue-300 mb-2">
                  Image
                </label>
                <div
                  {...getRootProps()}
                  className="w-full px-4 py-6 bg-black/50 text-white rounded-lg border border-dashed border-blue-900 hover:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200 flex items-center justify-center cursor-pointer"
                >
                  <input {...getInputProps()} />
                  <p className="text-sm text-blue-300">
                    Drag & drop an image here, or{" "}
                    <span className="text-blue-500 underline">
                      click to select
                    </span>
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

export default TeamMemberComponent;
