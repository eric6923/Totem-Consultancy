import { useState } from 'react';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import { saveAs } from 'file-saver';

interface FormData {
  firstName: string;
  lastName: string;
  fromDate: string;
  toDate: string;
  courseName: string;
  description: string;
}

interface ValidationErrors {
  [key: string]: string;
}

const CertificateGenerator = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    fromDate: '',
    toDate: '',
    courseName: '',
    description: ''
  });
  const [errors, setErrors] = useState<ValidationErrors>({});

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    if (!formData.courseName.trim()) {
      newErrors.courseName = 'Course name is required';
    }
    if (formData.fromDate && formData.toDate) {
      if (new Date(formData.fromDate) > new Date(formData.toDate)) {
        newErrors.fromDate = 'Start date must be before end date';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const generateDocument = async () => {
    if (!validateForm()) {
      return;
    }

    setIsGenerating(true);
    try {
      const response = await fetch('/demo.docx');
      if (!response.ok) {
        throw new Error('Failed to load certificate template');
      }
      
      const blob = await response.blob();
      const arrayBuffer = await blob.arrayBuffer();
      const zip = new PizZip(arrayBuffer);

      const doc = new Docxtemplater()
        .loadZip(zip)
        .setData({
          firstName: formData.firstName,
          lastName: formData.lastName,
          fromDate: formData.fromDate ? formatDate(formData.fromDate) : '',
          toDate: formData.toDate ? formatDate(formData.toDate) : '',
          courseName: formData.courseName,
          description: formData.description,
          fullName: `${formData.firstName} ${formData.lastName}`,
          currentDate: formatDate(new Date().toISOString()),
          date: formatDate(new Date().toISOString()),
        })
        .render();

      const out = doc.getZip().generate({
        type: 'blob',
        mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      });

      saveAs(out, `${formData.firstName}_${formData.lastName}_Certificate.docx`);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      alert(`Error generating certificate: ${errorMessage}`);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Certificate Generator</h1>
          <button
            onClick={generateDocument}
            disabled={isGenerating}
            className={`px-4 py-2 rounded text-white ${
              isGenerating 
                ? 'bg-blue-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
            aria-label="Generate certificate"
          >
            {isGenerating ? 'Generating...' : 'Generate Certificate'}
          </button>
        </div>

        <form 
          className="bg-white shadow-lg rounded-lg p-6 space-y-6"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label 
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                First Name *
              </label>
              <input
                id="firstName"
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className={`w-full p-2 border rounded ${
                  errors.firstName ? 'border-red-500' : 'border-gray-300'
                }`}
                aria-invalid={!!errors.firstName}
                aria-describedby={errors.firstName ? 'firstName-error' : undefined}
              />
              {errors.firstName && (
                <p id="firstName-error" className="mt-1 text-sm text-red-500">
                  {errors.firstName}
                </p>
              )}
            </div>
            
            <div>
              <label 
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Last Name *
              </label>
              <input
                id="lastName"
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className={`w-full p-2 border rounded ${
                  errors.lastName ? 'border-red-500' : 'border-gray-300'
                }`}
                aria-invalid={!!errors.lastName}
                aria-describedby={errors.lastName ? 'lastName-error' : undefined}
              />
              {errors.lastName && (
                <p id="lastName-error" className="mt-1 text-sm text-red-500">
                  {errors.lastName}
                </p>
              )}
            </div>
            
            <div>
              <label 
                htmlFor="fromDate"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                From Date
              </label>
              <input
                id="fromDate"
                type="date"
                name="fromDate"
                value={formData.fromDate}
                onChange={handleInputChange}
                className={`w-full p-2 border rounded ${
                  errors.fromDate ? 'border-red-500' : 'border-gray-300'
                }`}
                aria-invalid={!!errors.fromDate}
                aria-describedby={errors.fromDate ? 'fromDate-error' : undefined}
              />
              {errors.fromDate && (
                <p id="fromDate-error" className="mt-1 text-sm text-red-500">
                  {errors.fromDate}
                </p>
              )}
            </div>
            
            <div>
              <label 
                htmlFor="toDate"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                To Date
              </label>
              <input
                id="toDate"
                type="date"
                name="toDate"
                value={formData.toDate}
                onChange={handleInputChange}
                className="w-full p-2 border rounded border-gray-300"
              />
            </div>
            
            <div>
              <label 
                htmlFor="courseName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Course Name *
              </label>
              <input
                id="courseName"
                type="text"
                name="courseName"
                value={formData.courseName}
                onChange={handleInputChange}
                className={`w-full p-2 border rounded ${
                  errors.courseName ? 'border-red-500' : 'border-gray-300'
                }`}
                aria-invalid={!!errors.courseName}
                aria-describedby={errors.courseName ? 'courseName-error' : undefined}
              />
              {errors.courseName && (
                <p id="courseName-error" className="mt-1 text-sm text-red-500">
                  {errors.courseName}
                </p>
              )}
            </div>
            
            <div className="col-span-2">
              <label 
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full p-2 border rounded border-gray-300"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CertificateGenerator;