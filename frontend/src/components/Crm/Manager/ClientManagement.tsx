import React, { useState, useEffect } from 'react';
import { Loader2, Search, Mail, Phone, MapPin, Link, ArrowUpRight, Edit2, Trash2, X, Plus } from 'lucide-react';

interface Project {
  id: string;
  name: string;
  status: string;
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

interface ApiResponse {
  message: string;
  contacts: Contact[];
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



const ContactList: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [deleteLoading, setDeleteLoading] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [formLoading, setFormLoading] = useState<boolean>(false);

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    location: '',
    company: '',
    profileURL: '',
    isClient: true
  });

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async (): Promise<void> => {
    try {
      const response = await fetch('https://totem-consultancy-beta.vercel.app/api/crm/contacts');
      const data: ApiResponse = await response.json();
      const clientContacts = data.contacts.filter(contact => contact.isClient);
      setContacts(clientContacts);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch contacts');
      setLoading(false);
    }
  };

  const handleEdit = (contact: Contact) => {
    setEditingContact(contact);
    setFormData({
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      location: contact.location,
      company: contact.company || '',
      profileURL: contact.profileURL || '',
      isClient: true
    });
    setIsOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = (): string | null => {
    if (!formData.name.trim()) return "Name is required";
    if (!formData.email.trim()) return "Email is required";
    if (!formData.phone.trim()) return "Phone is required";
    if (!formData.location.trim()) return "Location is required";
    return null;
  };

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
  
    const requestData = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      location: formData.location.trim()
    };
  
    try {
      const response = await fetch(`https://totem-consultancy-beta.vercel.app/api/crm/contacts/${editingContact?.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData)
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || 'Failed to update contact');
      }
  
      setSuccess('Contact updated successfully!');
      await fetchContacts();
      
      setTimeout(() => {
        setIsOpen(false);
        setSuccess('');
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update contact');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (contactId: string) => {
    if (!window.confirm('Are you sure you want to delete this contact?')) return;
    
    setDeleteLoading(contactId);
    try {
      const response = await fetch(`https://totem-consultancy-beta.vercel.app/api/crm/contacts/${contactId}`, {
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

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.company?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Clients
          </h1>
        </div>

        {/* Search Section */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search clients..."
              value={searchTerm}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            />
          </div>
        </div>

        {/* Success/Error Messages */}
        {success && (
          <div className="mb-4 p-4 bg-green-50 dark:bg-green-900/50 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-200 rounded-lg">
            {success}
          </div>
        )}
        {error && (
          <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-200 rounded-lg">
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
            {/* Desktop View */}
            <div className="hidden lg:block">
              <div className="shadow-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Contact</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Contact Info</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Location</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Company</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {filteredContacts.map((contact) => (
                      <tr key={contact.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div>
                              <div className="text-sm font-medium text-gray-900 dark:text-white">{contact.name}</div>
                              {contact.profileURL && (
                                <a
                                  href={contact.profileURL}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-2 text-sm text-blue-500 hover:text-blue-600 mt-1"
                                >
                                  <Link className="h-4 w-4" />
                                  Profile
                                  <ArrowUpRight className="h-4 w-4" />
                                </a>
                              )}
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-1">
                                Client
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 dark:text-gray-300 space-y-1">
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
                          <div className="flex items-center gap-2 text-sm">
                            <MapPin className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-900 dark:text-gray-300">{contact.location}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-900 dark:text-gray-300">
                            {contact.company || 'N/A'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-4">
                            <button
                              onClick={() => window.location.href = `/contacts/edit/${contact.id}`}
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

            {/* Mobile View */}
            <div className="lg:hidden space-y-4">
              {filteredContacts.map((contact) => (
                <div key={contact.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">{contact.name}</h3>
                        {contact.company && (
                          <p className="text-sm text-gray-500 dark:text-gray-400">{contact.company}</p>
                        )}
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-1">
                          Client
                        </span>
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

                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-sm">
                        <Mail className="h-4 w-4 text-gray-400 flex-shrink-0" />
                        <span className="text-gray-600 dark:text-gray-300">{contact.email}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <Phone className="h-4 w-4 text-gray-400 flex-shrink-0" />
                        <span className="text-gray-600 dark:text-gray-300">{contact.phone}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <MapPin className="h-4 w-4 text-gray-400 flex-shrink-0" />
                        <span className="text-gray-600 dark:text-gray-300">{contact.location}</span>
                      </div>
                    </div>

                    {contact.profileURL && (
                      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <a
                          href={contact.profileURL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between text-sm text-blue-500 hover:text-blue-600"
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
      </div>
    </div>
  );
};

export default ContactList;