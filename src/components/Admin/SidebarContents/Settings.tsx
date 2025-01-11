import React, { useState } from 'react';
import { Globe, UserPlus, KeyRound, ChevronDown } from 'lucide-react';

const SettingsPage = () => {
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [showSuccess, setShowSuccess] = useState(false);

  const languages = [
    "English",
    "Spanish",
    "French",
    "German"
  ];

  const handleSubmit = (e:any) => {
    e.preventDefault();
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {showSuccess && (
        <div className="fixed top-4 right-4 z-50">
          <div className="px-4 py-3 rounded-lg bg-green-50 border border-green-200 shadow-lg">
            <p className="text-sm text-green-800">Changes saved successfully!</p>
          </div>
        </div>
      )}

      <div className="max-w-3xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="space-y-6 lg:space-y-8">
          {/* Header */}
          <div className="border-b border-gray-200 pb-5 lg:pb-8">
            <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-900 to-blue-700 bg-clip-text text-transparent">
              Settings
            </h1>
            <p className="mt-2 text-gray-600 text-lg">Manage your account preferences and settings</p>
          </div>

          {/* Language Settings */}
          <div className="bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300">
            <div className="p-6 lg:p-8">
              <div className="flex items-start gap-4 mb-8">
                <div className="flex-shrink-0 p-3 bg-blue-50 rounded-lg">
                  <Globe className="h-7 w-7 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Language Settings</h2>
                  <p className="mt-2 text-gray-500 text-base">Choose your preferred language</p>
                </div>
              </div>
              
              <div className="relative w-full max-w-md">
                <button
                  onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                  className="w-full px-5 py-4 text-left bg-white border border-gray-300 rounded-lg hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 flex items-center justify-between transition-colors duration-200"
                >
                  <span className="text-gray-700 text-lg">{selectedLanguage}</span>
                  <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${isLanguageOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isLanguageOpen && (
                  <div className="absolute w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-xl z-10">
                    {languages.map((lang) => (
                      <button
                        key={lang}
                        onClick={() => {
                          setSelectedLanguage(lang);
                          setIsLanguageOpen(false);
                        }}
                        className="w-full px-5 py-4 text-left text-lg text-gray-700 hover:bg-blue-50 hover:text-blue-700 focus:bg-blue-50 focus:outline-none first:rounded-t-lg last:rounded-b-lg transition-colors duration-200"
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Add New User */}
          <div className="bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300">
            <div className="p-6 lg:p-8">
              <div className="flex items-start gap-4 mb-8">
                <div className="flex-shrink-0 p-3 bg-blue-50 rounded-lg">
                  <UserPlus className="h-7 w-7 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Add New User</h2>
                  <p className="mt-2 text-gray-500 text-base">Create a new user account</p>
                </div>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full px-5 py-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      placeholder="Enter email"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-5 py-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      placeholder="Enter full name"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    type="password"
                    className="w-full px-5 py-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    placeholder="Enter password"
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white text-lg rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 font-medium"
                >
                  Add User
                </button>
              </form>
            </div>
          </div>

          {/* Password Reset */}
          <div className="bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300">
            <div className="p-6 lg:p-8">
              <div className="flex items-start gap-4 mb-8">
                <div className="flex-shrink-0 p-3 bg-blue-50 rounded-lg">
                  <KeyRound className="h-7 w-7 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Password Reset</h2>
                  <p className="mt-2 text-gray-500 text-base">Reset your password</p>
                </div>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-5 py-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    placeholder="Enter your email"
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white text-lg rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 font-medium"
                >
                  Send Reset Link
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;