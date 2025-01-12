import { PDFDocument } from 'pdf-lib'; // Make sure to install pdf-lib: npm install pdf-lib
import  { useState } from 'react';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import { saveAs } from 'file-saver';

const CertificateGenerator = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    fromDate: '',
    toDate: '',
    courseName: '',
    description: ''
  });

  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  

const generateDocument = async () => {
  try {
    const response = await fetch('/demo.docx'); // Your template should be in the public folder
    const blob = await response.blob();
    const arrayBuffer = await blob.arrayBuffer();

    const zip = new PizZip(arrayBuffer);

    // Helper function to format date as DD/MM/YYYY
    const formatDate = (dateString : any) => {
      const date = new Date(dateString);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    };

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
        currentDate: formatDate(new Date()), // Format today's date
        date: formatDate(new Date()), // Format today's date
      })
      .render();

    const out = doc.getZip().generate({
      type: 'blob',
      mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    });

    // Convert Word document (blob) to PDF
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
    page.drawText(`Certificate Generated for ${formData.firstName} ${formData.lastName}`, {
      x: 50,
      y: 700,
      size: 12,
    });
    // Add more text to mimic content from the Word file as needed...

    const pdfBytes = await pdfDoc.save();
    const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });
    saveAs(pdfBlob, `${formData.firstName}_${formData.lastName}_Certificate.pdf`);
  } catch (error) {
    console.error('Error generating document:', error);
    alert('Error generating document. Please try again.');
  }
};

  

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Certificate Generator</h1>
          <button
            onClick={generateDocument}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Generate Certificate
          </button>
        </div>

        <form className="bg-white shadow-lg rounded-lg p-6 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                From Date
              </label>
              <input
                type="date"
                name="fromDate"
                value={formData.fromDate}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                To Date
              </label>
              <input
                type="date"
                name="toDate"
                value={formData.toDate}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Course Name
              </label>
              <input
                type="text"
                name="courseName"
                value={formData.courseName}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
            
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CertificateGenerator;