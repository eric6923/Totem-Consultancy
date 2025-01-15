import prisma from "../../prisma/client.js";
import { logRecentActivity } from "../helpers/recent.js";


// Create a new certificate
export const createCertificate = async (req, res) => {
  const { firstName, lastName, courseName, description, fromDate, tomDate } = req.body;
  const changesBy = req.user?.name || "Unknown User";

  try {
    const newCertificate = await prisma.certificate.create({
      data: {
        firstName,
        lastName,
        courseName,
        description,
        fromDate: new Date(fromDate),
        tomDate: new Date(tomDate),
      },
    });

    // Log activity
    await logRecentActivity(
      `Created certificate for ${firstName} ${lastName} (${courseName})`,
      changesBy
    );

    res.status(201).json(newCertificate);
  } catch (error) {
    console.error("Error creating certificate:", error);
    res.status(500).json({
      message: "Failed to create certificate",
      error: error.message,
    });
  }
};

// Get all certificates
export const getAllCertificates = async (req, res) => {
  try {
    const certificates = await prisma.certificate.findMany();
    res.status(200).json(certificates);
  } catch (error) {
    console.error("Error fetching certificates:", error);
    res.status(500).json({
      message: "Failed to fetch certificates",
      error: error.message,
    });
  }
};

// Get a single certificate by ID
export const getCertificateById = async (req, res) => {
  const { id } = req.params;

  try {
    const certificate = await prisma.certificate.findUnique({
      where: { id: parseInt(id) },
    });

    if (!certificate) {
      return res.status(404).json({ message: "Certificate not found" });
    }

    res.status(200).json(certificate);
  } catch (error) {
    console.error("Error fetching certificate:", error);
    res.status(500).json({
      message: "Failed to fetch certificate",
      error: error.message,
    });
  }
};

// Update a certificate
export const updateCertificate = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, courseName, description, fromDate, tomDate } = req.body;
  const changesBy = req.user?.name || "Unknown User";

  try {
    const existingCertificate = await prisma.certificate.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingCertificate) {
      return res.status(404).json({ message: "Certificate not found" });
    }

    const updatedCertificate = await prisma.certificate.update({
      where: { id: parseInt(id) },
      data: {
        firstName,
        lastName,
        courseName,
        description,
        fromDate: new Date(fromDate),
        tomDate: new Date(tomDate),
      },
    });

    // Log activity
    await logRecentActivity(
      `Updated certificate for ${existingCertificate.firstName} ${existingCertificate.lastName} (${existingCertificate.courseName})`,
      changesBy
    );

    res.status(200).json(updatedCertificate);
  } catch (error) {
    console.error("Error updating certificate:", error);
    res.status(500).json({
      message: "Failed to update certificate",
      error: error.message,
    });
  }
};

// Delete a certificate
export const deleteCertificate = async (req, res) => {
  const { id } = req.params;
  const changesBy = req.user?.name || "Unknown User";

  try {
    const existingCertificate = await prisma.certificate.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingCertificate) {
      return res.status(404).json({ message: "Certificate not found" });
    }

    await prisma.certificate.delete({
      where: { id: parseInt(id) },
    });

    // Log activity
    await logRecentActivity(
      `Deleted certificate for ${existingCertificate.firstName} ${existingCertificate.lastName} (${existingCertificate.courseName})`,
      changesBy
    );

    res.status(200).json({ message: "Certificate deleted successfully" });
  } catch (error) {
    console.error("Error deleting certificate:", error);
    res.status(500).json({
      message: "Failed to delete certificate",
      error: error.message,
    });
  }
};
