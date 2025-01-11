import React, { useState } from 'react';
import jsPDF from 'jspdf';

interface CertificateData {
  refNumber: string;
  name: string;
  position: string;
  startDate: string;
  endDate: string;
  supervisor: string;
  contributionPoints: string[];
}

const Certificate: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<CertificateData>({
    refNumber: 'TMAC/2024-25/Vol/IC04',
    name: '',
    position: '',
    startDate: '',
    endDate: '',
    supervisor: '',
    contributionPoints: ['', '', '', ''],
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePointChange = (index: number, value: string) => {
    const newPoints = [...formData.contributionPoints];
    newPoints[index] = value;
    setFormData((prev) => ({ ...prev, contributionPoints: newPoints }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    generatePDF();
  };

  const generatePDF = () => {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    // Add background image
    doc.addImage('background.jpg', 'JPEG', 0, 0, 210, 297); // Replace with actual image path

    // Add logo
    doc.addImage('logo.png', 'PNG', 15, 15, 30, 30); // Replace with actual logo path

    // Header
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('TOTEM', 105, 20, { align: 'center' });
    doc.setFontSize(14);
    doc.text('MANAGEMENT & CONSULTANCY', 105, 30, { align: 'center' });
    doc.text('PRIVATE LIMITED', 105, 40, { align: 'center' });

    // Reference number
    doc.setFontSize(11);
    doc.text(formData.refNumber, 20, 50);

    // Certificate title
    doc.setFontSize(16);
    doc.text('Internship Completion Certificate', 105, 70, { align: 'center' });

    // Line design
    doc.setLineWidth(0.5);
    doc.line(20, 75, 190, 75);

    // Certificate content
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    const content = `This is to certify that ${formData.name} has successfully completed an internship as a ${formData.position} with Totem Management and Consultancy Pvt. Ltd. from ${formData.startDate} to ${formData.endDate} under the supervision of ${formData.supervisor}.`;
    doc.text(doc.splitTextToSize(content, 170), 20, 90);

    // Contribution points
    doc.text('During this period, the intern contributed significantly to:', 20, 120);
    formData.contributionPoints.forEach((point, index) => {
      doc.text(`• ${point}`, 25, 130 + index * 10);
    });

    // Footer
    doc.setFontSize(10);
    doc.text('CIN U85500HR2023PTC112356', 20, 180);
    doc.setFontSize(11);
    doc.text(
      'If you require any additional information regarding this internship, please feel free to contact us.',
      105,
      230,
      { align: 'center' }
    );
    doc.text('Totem Management and Consultancy Pvt Limited', 105, 250, { align: 'center' });
    doc.text('www.totemservices.org | +91 82784-16000', 105, 260, { align: 'center' });
    doc.text('SCO 10, Matha Market, New Lakhan Chowk, Thanesar', 105, 270, { align: 'center' });
    doc.text('Kurukshetra, 136118', 105, 280, { align: 'center' });

    // Save the PDF
    doc.save('TMAC_Certificate.pdf');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">TMAC Certificate Generation</h1>

      {!showForm && (
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          onClick={() => setShowForm(true)}
        >
          Generate Certificate
        </button>
      )}

      {showForm && (
        <form onSubmit={handleFormSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-2xl">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Reference Number</label>
            <input
              type="text"
              name="refNumber"
              value={formData.refNumber}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Intern Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Position</label>
            <input
              type="text"
              name="position"
              value={formData.position}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Start Date</label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">End Date</label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Supervisor Name</label>
            <input
              type="text"
              name="supervisor"
              value={formData.supervisor}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Contribution Points</label>
            {formData.contributionPoints.map((point, index) => (
              <input
                key={index}
                type="text"
                value={point}
                onChange={(e) => handlePointChange(index, e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 mb-2"
                placeholder={`Contribution point ${index + 1}`}
                required
              />
            ))}
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
            >
              Generate PDF
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Certificate;