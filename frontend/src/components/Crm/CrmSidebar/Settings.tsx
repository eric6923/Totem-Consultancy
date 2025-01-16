import React, { useState } from 'react';
import { UserPlus, Users, ShieldCheck } from 'lucide-react';

interface UserFormProps {
  title: string;
  description: string;
  icon: React.ElementType;
}

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState<'admin' | 'manager' | 'member'>('admin');

  const UserForm: React.FC<UserFormProps> = ({ title, description, icon: Icon }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 w-full">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h2>
        </div>
        <p className="text-gray-600 dark:text-gray-300 text-sm">{description}</p>
      </div>

      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            Name
          </label>
          <input
            type="text"
            className="w-full px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-md 
                     focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500
                     bg-white dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
            placeholder="Enter name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            Email
          </label>
          <input
            type="email"
            className="w-full px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-md 
                     focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500
                     bg-white dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
            placeholder="Enter email"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            Password
          </label>
          <input
            type="password"
            className="w-full px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-md 
                     focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500
                     bg-white dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
            placeholder="Enter password"
          />
        </div>

        <div className="flex justify-start ">
          <button
            type="submit"
            className="bg-blue-600 text-white text-sm py-1.5 px-6 rounded-md 
                     hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
                     dark:focus:ring-offset-gray-800 transition-colors"
          >
            Add {title}
          </button>
        </div>
      </form>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-4">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Settings</h1>
          <p className="text-gray-600 dark:text-gray-300 text-sm">Manage your team members and their roles</p>
        </div>

        <div className="mb-6">
          <div className="flex space-x-1 border-b border-gray-200 dark:border-gray-700">
            {[
              { id: 'admin', label: 'Admin' },
              { id: 'manager', label: 'Manager' },
              { id: 'member', label: 'Team Member' }
            ].map(({ id, label }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as 'admin' | 'manager' | 'member')}
                className={`px-4 py-2 font-medium text-sm focus:outline-none transition-colors
                  ${activeTab === id
                    ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
              >
                Add {label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          {activeTab === 'admin' && (
            <UserForm
              title="Admin"
              description="Add a new admin with full system access"
              icon={ShieldCheck}
            />
          )}
          {activeTab === 'manager' && (
            <UserForm
              title="Manager"
              description="Add a new manager with team management capabilities"
              icon={UserPlus}
            />
          )}
          {activeTab === 'member' && (
            <UserForm
              title="Team Member"
              description="Add a new team member to your organization"
              icon={Users}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;