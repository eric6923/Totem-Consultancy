import React, { useState, useEffect } from 'react';
import { X, Plus, Calendar, User, Users } from 'lucide-react';

interface Project {
  id: string;
  name: string;
  desc: string;
  status: string;
}

interface User {
  id: string;
  name: string;
  designation: string;
  email: string;
}

interface Task {
  id: string;
  name: string;
  desc: string;
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string;
  project: {
    id: string;
    name: string;
    status: string;
  };
  assignedManager: {
    id: string;
    name: string;
    designation: string;
  };
  assignedTeammember: {
    id: string;
    name: string;
    designation: string;
  };
}

interface TaskFormData {
  name: string;
  desc: string;
  projectId: string;
  assignedManagerId: string;
  assignedTeammemberId: string;
}

const TaskManagementPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [managers, setManagers] = useState<User[]>([]);
  const [teamMembers, setTeamMembers] = useState<User[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<TaskFormData>({
    name: '',
    desc: '',
    projectId: '',
    assignedManagerId: '',
    assignedTeammemberId: ''
  });

  useEffect(() => {
    fetchTasks();
    fetchFormData();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch('https://totem-consultancy-beta.vercel.app/api/crm/tasks');
      const data = await response.json();
      setTasks(data.tasks || []);
    } catch (err) {
      console.error('Error fetching tasks:', err);
    }
  };

  const fetchFormData = async () => {
    try {
      const [projectsRes, managersRes, teamMembersRes] = await Promise.all([
        fetch('https://totem-consultancy-beta.vercel.app/api/crm/projects'),
        fetch('https://totem-consultancy-beta.vercel.app/api/crm/users?role=manager'),
        fetch('https://totem-consultancy-beta.vercel.app/api/crm/users?role=teammember')
      ]);

      const projectsData = await projectsRes.json();
      const managersData = await managersRes.json();
      const teamMembersData = await teamMembersRes.json();

      setProjects(projectsData.projectts || []);
      setManagers(managersData.users || []);
      setTeamMembers(teamMembersData.users || []);
    } catch (err) {
      console.error('Error fetching form data:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('https://totem-consultancy-beta.vercel.app/api/crm/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to create task');
      }

      setIsModalOpen(false);
      setFormData({
        name: '',
        desc: '',
        projectId: '',
        assignedManagerId: '',
        assignedTeammemberId: ''
      });
      fetchTasks(); // Refresh tasks list
    } catch (err) {
      setError('Failed to create task. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Tasks</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create Task
          </button>
        </div>

        <div className="space-y-4">
          {tasks.map((task) => (
            <div key={task.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">{task.name}</h3>
                  <p className="text-gray-600 mt-1">{task.desc}</p>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium
                      ${task.project.status === 'completed' ? 'bg-green-100 text-green-800' :
                        task.project.status === 'inProgress' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'}`}>
                      {task.project.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    {formatDate(task.createdAt)}
                  </div>
                </div>
              </div>
              <div className="mt-4 flex flex-col sm:flex-row gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{task.assignedManager.name} ({task.assignedManager.designation})</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>{task.assignedTeammember.name} ({task.assignedTeammember.designation})</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Create New Task</h2>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {error && (
                  <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-600 rounded-md">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Task Name
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Enter task name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[100px]"
                      value={formData.desc}
                      onChange={(e) => setFormData(prev => ({ ...prev, desc: e.target.value }))}
                      placeholder="Enter task description"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Project
                    </label>
                    <select
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={formData.projectId}
                      onChange={(e) => setFormData(prev => ({ ...prev, projectId: e.target.value }))}
                    >
                      <option value="">Select a project</option>
                      {projects.map((project) => (
                        <option key={project.id} value={project.id}>
                          {project.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Assigned Manager
                    </label>
                    <select
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={formData.assignedManagerId}
                      onChange={(e) => setFormData(prev => ({ ...prev, assignedManagerId: e.target.value }))}
                    >
                      <option value="">Select a manager</option>
                      {managers.map((manager) => (
                        <option key={manager.id} value={manager.id}>
                          {manager.name} - {manager.designation}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Assigned Team Member
                    </label>
                    <select
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={formData.assignedTeammemberId}
                      onChange={(e) => setFormData(prev => ({ ...prev, assignedTeammemberId: e.target.value }))}
                    >
                      <option value="">Select a team member</option>
                      {teamMembers.map((member) => (
                        <option key={member.id} value={member.id}>
                          {member.name} - {member.designation}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-2 px-4 rounded-md text-white font-medium 
                      ${loading 
                        ? 'bg-blue-400 cursor-not-allowed' 
                        : 'bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                      }`}
                  >
                    {loading ? 'Creating Task...' : 'Create Task'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskManagementPage;