import React, { useState, useEffect } from 'react';
import { Pencil, Trash2,Briefcase,Plus } from 'lucide-react';

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
      const response = await fetch('https://totem-consultancy-beta.vercel.app/api/crm/projects');
      const data = await response.json();
      setProjects(data.projectts || []);  // Note: API response uses "projectts"
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const fetchContacts = async () => {
    try {
      const response = await fetch('https://totem-consultancy-beta.vercel.app/api/crm/contacts');
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
        ? `https://totem-consultancy-beta.vercel.app/api/crm/projects/${selectedProject.id}`
        : 'https://totem-consultancy-beta.vercel.app/api/crm/projects';

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

  const handleDelete = async (projectId: string) => {
    try {
      const response = await fetch(`https://totem-consultancy-beta.vercel.app/api/crm/projects/${projectId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchProjects();
        setIsDeleteModalOpen(false);
      }
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

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
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-12">
  <div className="flex items-center gap-4">
    <div className="bg-blue-600 p-3 rounded-xl">
      <Briefcase className="h-8 w-8 text-white" />
    </div>
    <div>
      <h1 className="text-4xl font-bold text-gray-900">Projects</h1>
      <p className="mt-1 text-gray-500">Manage your project portfolio</p>
    </div>
  </div>
  <button
    onClick={() => handleOpenModal()}
    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
  >
    <Plus className="h-5 w-5 mr-2" />
    Add Project
  </button>
</div>

      {/* Projects Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {projects.map((project) => (
              <tr key={project.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">{project.name}</td>
                <td className="px-6 py-4">{project.desc}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${project.status === 'completed' ? 'bg-green-100 text-green-800' : 
                      project.status === 'inProgress' ? 'bg-blue-100 text-blue-800' : 
                      'bg-yellow-100 text-yellow-800'}`}>
                    {project.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm">
                    <div className="font-medium text-gray-900">{project.contact.name}</div>
                    <div className="text-gray-500">{project.contact.email}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{formatDate(project.createdAt)}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleOpenModal(project)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedProject(project);
                        setIsDeleteModalOpen(true);
                      }}
                      className="text-red-600 hover:text-red-900"
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

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <h2 className="text-xl font-bold mb-4">
              {selectedProject ? 'Edit Project' : 'Add Project'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Project Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="desc"
                  value={formData.desc}
                  onChange={handleChange}
                  required
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="inProgress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="onHold">On Hold</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contact
                </label>
                <select
                  name="contactId"
                  value={formData.contactId}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    ? 'bg-red-50 text-red-700' 
                    : 'bg-green-50 text-green-700'
                }`}>
                  {message}
                </div>
              )}

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
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
      {isDeleteModalOpen && selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Delete Project</h2>
            <p className="mb-4">Are you sure you want to delete "{selectedProject.name}"?</p>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
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
      )}
    </div>
  );
};

export default ProjectManagement;