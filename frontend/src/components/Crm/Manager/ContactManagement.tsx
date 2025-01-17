import React, { useState, useEffect } from 'react';
import { Plus, X, Loader2, Phone, Mail, MapPin, Search, Building2, Link, Briefcase, ArrowUpRight, ChevronDown, Edit2, Trash2 } from 'lucide-react';

interface Project {
  id: string;
  name: string;
  desc: string;
  status: string;
  contactId: string;
  createdAt: string;
  updatedAt: string;
}

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string | null;
  profileURL: string | null;
  location: string;
  isClient: boolean;
  projects: Project[];
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  location: string;
  company: string;
  profileURL: string;
  isClient: boolean;
}

const ContactForm: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [formLoading, setFormLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [menuOpen, setMenuOpen] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState<string>('');
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    location: '',
    company: '',
    profileURL: '',
    isClient: false
  });

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://bihar-innovation-omega.vercel.app/api/crm/contacts');
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch contacts');
      }
      setContacts(data.contacts);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      isClient: e.target.checked
    }));
  };

  const validateForm = (): string | null => {
    if (!formData.name.trim()) return "Name is required";
    if (!formData.email.trim()) return "Email is required";
    if (!formData.phone) return "Phone is required";
    if (!formData.location.trim()) return "Location is required";
    return null;
  };

  const handleDelete = async (contactId: string) => {
    if (!window.confirm('Are you sure you want to delete this contact?')) return;
    
    setDeleteLoading(contactId);
    try {
      const response = await fetch(`https://bihar-innovation-omega.vercel.app/api/crm/contacts/${contactId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to delete contact');
      }

      setSuccess('Contact deleted successfully!');
      fetchContacts();
      
      setTimeout(() => {
        setSuccess('');
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete contact');
    } finally {
      setDeleteLoading('');
    }
  };

  // Update the handleSubmit function
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setError('');
  setSuccess('');

  const validationError = validateForm();
  if (validationError) {
    setError(validationError);
    return;
  }

  setFormLoading(true);

  // Remove parseInt as phone should be string based on API response
  const requestData = {
    name: formData.name.trim(),
    email: formData.email.trim(),
    phone: formData.phone.trim(), // Keep as string
    location: formData.location.trim(),
    company: formData.company.trim() || null,
    profileURL: formData.profileURL.trim() || null,
    isClient: formData.isClient
  };

  try {
    const url = editingContact 
      ? `https://bihar-innovation-omega.vercel.app/api/crm/contacts/${editingContact.id}`
      : 'https://bihar-innovation-omega.vercel.app/api/crm/contacts';
    
    const method = editingContact ? 'PUT' : 'POST';
    
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `Failed to ${editingContact ? 'update' : 'create'} contact`);
    }

    setSuccess(`Contact ${editingContact ? 'updated' : 'created'} successfully!`);
    setFormData({
      name: '',
      email: '',
      phone: '',
      location: '',
      company: '',
      profileURL: '',
      isClient: false
    });
    
    await fetchContacts(); // Wait for contacts to update
    setEditingContact(null);
    
    setTimeout(() => {
      setIsOpen(false);
      setSuccess('');
    }, 2000);
  } catch (err) {
    console.error('Error details:', err);
    setError(err instanceof Error ? err.message : `Failed to ${editingContact ? 'update' : 'create'} contact`);
  } finally {
    setFormLoading(false);
  }
};

  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.company?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (contact: Contact) => {
    setEditingContact(contact);
    setFormData({
      name: contact.name,
      email: contact.email,
      phone: contact.phone.toString(),
      location: contact.location,
      company: contact.company || '',
      profileURL: contact.profileURL || '',
      isClient: contact.isClient
    });
    setIsOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Contacts</h1>
          <button
            onClick={() => {
              setEditingContact(null);
              setFormData({
                name: '',
                email: '',
                phone: '',
                location: '',
                company: '',
                profileURL: '',
                isClient: false
              });
              setIsOpen(true);
            }}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Contact
          </button>
        </div>

        {/* Search Section */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search contacts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Success/Error Messages */}
        {success && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg">
            {success}
          </div>
        )}
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {/* Contacts List */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          </div>
        ) : (
          <>
            {/* Desktop View - Table */}
            <div className="hidden lg:block">
              <div className="shadow-sm border border-gray-200 rounded-lg bg-white overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact Info</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Projects</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredContacts.map((contact) => (
                      <tr key={contact.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div>
                              <div className="text-sm font-medium text-gray-900">{contact.name}</div>
                              {contact.company && (
                                <div className="text-sm text-gray-500">{contact.company}</div>
                              )}
                              {contact.isClient && (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-1">
                                  Client
                                </span>
                              )}
                              {contact.profileURL && (
                                <a
                                  href={contact.profileURL}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 mt-1"
                                >
                                  <Link className="h-4 w-4" />
                                  View Profile
                                  <ArrowUpRight className="h-4 w-4" />
                                </a>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 space-y-1">
                            <div className="flex items-center gap-2">
                              <Mail className="h-4 w-4 text-gray-400" />
                              {contact.email}
                            </div>
                            <div className="flex items-center gap-2">
                              <Phone className="h-4 w-4 text-gray-400" />
                              {contact.phone}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2 text-sm text-gray-900">
                            <MapPin className="h-4 w-4 text-gray-400" />
                            {contact.location}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          {contact.projects?.length > 0 ? (
                            <div className="space-y-2">
                              {contact.projects.map((project) => (
                                <div key={project.id} className="text-sm">
                                  <div className="font-medium text-gray-900">{project.name}</div>
                                  <div className="text-gray-500">{project.status}</div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <span className="text-sm text-gray-500">No projects</span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-4">
                            <button
                              onClick={() => handleEdit(contact)}
                              className="text-blue-600 hover:text-blue-800 transition-colors"
                            >
                              <Edit2 className="h-5 w-5" />
                            </button>
                            <button
                              onClick={() => handleDelete(contact.id)}
                              disabled={deleteLoading === contact.id}
                              className="text-red-600 hover:text-red-800 transition-colors disabled:text-red-300"
                            >
                              {deleteLoading === contact.id ? (
                                <Loader2 className="h-5 w-5 animate-spin" />
                              ) : (
                                <Trash2 className="h-5 w-5" />
                              )}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile View - Cards */}
            <div className="lg:hidden space-y-4">
              {filteredContacts.map((contact) => (
                <div key={contact.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                  <div className="p-4">
                    {/* Header with Actions */}
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{contact.name}</h3>
                        {contact.company && (
                          <p className="text-sm text-gray-500">{contact.company}</p>
                        )}
                        {contact.isClient && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-1">
                            Client
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => handleEdit(contact)}
                          className="text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          <Edit2 className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(contact.id)}
                          disabled={deleteLoading === contact.id}
                          className="text-red-600 hover:text-red-800 transition-colors disabled:text-red-300"
                        >
                          {deleteLoading === contact.id ? (
                            <Loader2 className="h-5 w-5 animate-spin" />
                          ) : (
                            <Trash2 className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Contact Details */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-sm">
                        <Mail className="h-4 w-4 text-gray-400 flex-shrink-0" />
                        <span className="text-gray-600 truncate">{contact.email}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <Phone className="h-4 w-4 text-gray-400 flex-shrink-0" />
                        <span className="text-gray-600">{contact.phone}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <MapPin className="h-4 w-4 text-gray-400 flex-shrink-0" />
                        <span className="text-gray-600">{contact.location}</span>
                      </div>
                    </div>

                    {/* Projects Section */}
                    {contact.projects?.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <h4 className="text-sm font-medium text-gray-900 mb-2 flex items-center gap-2">
                          <Briefcase className="h-4 w-4 text-gray-400" />
                          Projects
                        </h4>
                        <div className="space-y-2">
                          {contact.projects.map((project) => (
                            <div
                              key={project.id}
                              className="bg-gray-50 p-3 rounded-md text-sm"
                            >
                              <div className="font-medium text-gray-900">{project.name}</div>
                              <div className="text-gray-500 mt-1">{project.status}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Profile Link */}
                    {contact.profileURL && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <a
                          href={contact.profileURL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between text-sm text-blue-600 hover:text-blue-800"
                        >
                          <span className="flex items-center gap-2">
                            <Link className="h-4 w-4" />
                            View Profile
                          </span>
                          <ArrowUpRight className="h-4 w-4" />
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Modal Form */}
        {isOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md relative">
              <div className="flex justify-between items-center p-6 border-b">
                <h2 className="text-xl font-semibold text-gray-900">
                  {editingContact ? 'Edit Contact' : 'Create New Contact'}
                </h2>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setEditingContact(null);
                    setFormData({
                      name: '',
                      email: '',
                      phone: '',
                      location: '',
                      company: '',
                      profileURL: '',
                      isClient: false
                    });
                  }}
                  className="text-gray-400 hover:text-gray-500 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="Enter full name"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        placeholder="email@example.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        placeholder="Enter phone number"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Location <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="City, Country"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Company
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="Company name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Profile URL
                    </label>
                    <input
                      type="url"
                      name="profileURL"
                      value={formData.profileURL}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="https://example.com/profile"
                    />
                  </div>
                </div>

                {error && (
                  <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                {success && (
                  <div className="p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm">
                    {success}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={formLoading}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:bg-blue-400"
                >
                  {formLoading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      {editingContact ? 'Updating Contact...' : 'Creating Contact...'}
                    </>
                  ) : (
                    editingContact ? 'Update Contact' : 'Create Contact'
                  )}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
  }
  export default ContactForm