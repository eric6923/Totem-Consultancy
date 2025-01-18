import React, { useState, useEffect } from 'react';
import { Pencil, Trash2 } from 'lucide-react';

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string | null;
  profileURL: string | null;
  location: string;
  isClient: boolean;
}

interface Project {
  id: string;
  name: string;
  desc: string;
  status: string;
  contactId: string;
  createdAt: string;
  updatedAt: string;
  contact: Contact;
  tasks: any[];
}

interface ProjectFormData {
  name: string;
  desc: string;
  status: string;
  contactId: string;
}
const LoadingSpinner = () => (
  <div className="flex items-center justify-center p-8">
    <div className="w-8 h-8 border-4 border-blue-200 rounded-full animate-spin border-t-blue-500" />
  </div>
);

const LoadingSkeleton = () => (
  <div className="animate-pulse">
    <div className="hidden md:block">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="border-b dark:border-gray-700 p-4">
          <div className="flex justify-between items-center">
            <div className="w-1/4 h-4 bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="w-1/4 h-4 bg-gray-200 dark:bg-gray-700 rounded" />
          </div>
          <div className="mt-4 w-3/4 h-4 bg-gray-200 dark:bg-gray-700 rounded" />
        </div>
      ))}
    </div>
    <div className="md:hidden">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="border-b dark:border-gray-700 p-4">
          <div className="w-3/4 h-5 bg-gray-200 dark:bg-gray-700 rounded mb-4" />
          <div className="w-full h-4 bg-gray-200 dark:bg-gray-700 rounded mb-3" />
          <div className="w-1/2 h-4 bg-gray-200 dark:bg-gray-700 rounded" />
        </div>
      ))}
    </div>
  </div>
);

const ProjectManagement = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState<ProjectFormData>({
    name: '',
    desc: '',
    status: 'inProgress',
    contactId: '',
  });

  useEffect(() => {
    fetchProjects();
    fetchContacts();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch('https://bihar-innovation-omega.vercel.app/api/crm/projects');
      const data = await response.json();
      setProjects(data.projectts || []);  // Note: API response uses "projectts"
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const fetchContacts = async () => {
    try {
      const response = await fetch('https://bihar-innovation-omega.vercel.app/api/crm/contacts');
      const data = await response.json();
      setContacts(data.contacts || []);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  const handleOpenModal = (project?: Project) => {
    if (project) {
      setSelectedProject(project);
      setFormData({
        name: project.name,
        desc: project.desc,
        status: project.status,
        contactId: project.contactId,
      });
    } else {
      setSelectedProject(null);
      setFormData({
        name: '',
        desc: '',
        status: 'inProgress',
        contactId: '',
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setMessage('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const url = selectedProject
        ? `https://bihar-innovation-omega.vercel.app/api/crm/projects/${selectedProject.id}`
        : 'https://bihar-innovation-omega.vercel.app/api/crm/projects';

      const response = await fetch(url, {
        method: selectedProject ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setMessage(data.message);
      
      if (response.ok) {
        fetchProjects();
        handleCloseModal();
      }
    } catch (error) {
      setMessage('Error processing request');
    } finally {
      setLoading(false);
    }
  };

  // const handleDelete = async (projectId: string) => {
  //   try {
  //     // Add logging to verify the ID
  //     console.log('Deleting project with ID:', projectId);
      
  //     const response = await fetch(`https://bihar-innovation-omega.vercel.app/api/crm/projects/${projectId}`, {
  //       method: 'DELETE',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //     });
  
  //     if (response.ok) {
  //       await fetchProjects();  // Wait for the projects to be fetched
  //       setIsDeleteModalOpen(false);
  //       setSelectedProject(null); // Clear the selected project
  //     } else {
  //       const errorData = await response.json();
  //       console.error('Server error:', errorData);
  //       throw new Error(errorData.message || 'Failed to delete project');
  //     }
  //   } catch (error) {
  //     console.error('Error deleting project:', error);
  //     // Optionally add error state handling here
  //     setMessage('Error deleting project. Please try again.');
  //   }
  // };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="p-4 md:p-6 dark:bg-gray-900">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold dark:text-white">Projects</h1>
        <button
          onClick={() => handleOpenModal()}
          className="w-full sm:w-auto bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add Project
        </button>
      </div>
  
      {/* Projects Table/Cards */}
      <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow">
        {loading ? (
          <div className="w-full">
            <div className="flex items-center justify-center p-8">
              <div className="w-8 h-8 border-4 border-blue-200 rounded-full animate-spin border-t-blue-500" />
            </div>
            <LoadingSkeleton />
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center p-8 text-gray-500 dark:text-gray-400">
            No projects found
          </div>
        ) : (
          <>
            {/* Desktop View */}
            <div className="hidden md:block">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Description</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Contact</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Created</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {projects.map((project) => (
                    <tr key={project.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-4 py-4 whitespace-nowrap text-sm dark:text-gray-200">{project.name}</td>
                      <td className="px-4 py-4 text-sm dark:text-gray-200">{project.desc}</td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${project.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-200 dark:text-green-900' : 
                            project.status === 'inProgress' ? 'bg-blue-100 text-blue-800 dark:bg-blue-200 dark:text-blue-900' : 
                            'bg-yellow-100 text-yellow-800 dark:bg-yellow-200 dark:text-yellow-900'}`}>
                          {project.status}
                        </span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm">
                          <div className="font-medium dark:text-gray-200">{project.contact.name}</div>
                          <div className="text-gray-500 dark:text-gray-400">{project.contact.email}</div>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm dark:text-gray-200">
                        {formatDate(project.createdAt)}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex space-x-3">
                          <button
                            onClick={() => handleOpenModal(project)}
                            className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300"
                          >
                            <Pencil size={18} />
                          </button>
                          <button
                            onClick={() => {
                              setSelectedProject(project);
                              setIsDeleteModalOpen(true);
                            }}
                            className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
  
            {/* Mobile View */}
            <div className="md:hidden">
              {projects.map((project) => (
                <div key={project.id} className="border-b border-gray-200 dark:border-gray-700 p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-medium dark:text-white">{project.name}</h3>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleOpenModal(project)}
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300"
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedProject(project);
                          setIsDeleteModalOpen(true);
                        }}
                        className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
  
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600 dark:text-gray-300">{project.desc}</p>
                    
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full inline-block
                      ${project.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-200 dark:text-green-900' : 
                        project.status === 'inProgress' ? 'bg-blue-100 text-blue-800 dark:bg-blue-200 dark:text-blue-900' : 
                        'bg-yellow-100 text-yellow-800 dark:bg-yellow-200 dark:text-yellow-900'}`}>
                      {project.status}
                    </span>
  
                    <div className="mt-2">
                      <div className="text-sm font-medium dark:text-gray-200">{project.contact.name}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{project.contact.email}</div>
                    </div>
  
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Created: {formatDate(project.createdAt)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
  
      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl">
            <h2 className="text-xl font-bold mb-4 dark:text-white">
              {selectedProject ? 'Edit Project' : 'Add Project'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Project Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
  
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Description
                </label>
                <textarea
                  name="desc"
                  value={formData.desc}
                  onChange={handleChange}
                  required
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
  
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="inProgress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="onHold">On Hold</option>
                </select>
              </div>
  
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Contact
                </label>
                <select
                  name="contactId"
                  value={formData.contactId}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select a contact</option>
                  {contacts.map(contact => (
                    <option key={contact.id} value={contact.id}>
                      {contact.name} ({contact.email})
                    </option>
                  ))}
                </select>
              </div>
  
              {message && (
                <div className={`p-4 rounded-md ${
                  message.includes('Error') 
                    ? 'bg-red-50 dark:bg-red-900 text-red-700 dark:text-red-200' 
                    : 'bg-green-50 dark:bg-green-900 text-green-700 dark:text-green-200'
                }`}>
                  {message}
                </div>
              )}
  
              <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3 mt-6">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 dark:text-gray-200 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
                >
                  {loading ? 'Processing...' : selectedProject ? 'Update Project' : 'Create Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
  
      {/* Delete Confirmation Modal */}
      {/* {isDeleteModalOpen && selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 dark:text-white">Delete Project</h2>
            <p className="mb-4 dark:text-gray-300">Are you sure you want to delete "{selectedProject.name}"?</p>
            
            <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 dark:text-gray-200 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(selectedProject.id)}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default ProjectManagement;