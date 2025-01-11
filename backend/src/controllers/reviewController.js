import prisma from "../../prisma/client.js";

/**
 * Create a new review
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
const createReview = async (req, res) => {
  try {
    const { profileUrl, name, description } = req.body;

    if (!profileUrl || !name || !description) {
      return res.status(400).json({ 
        message: "profileUrl, name, and description are required" 
      });
    }

    const review = await prisma.review.create({
      data: { profileUrl, name, description },
    });

    return res.status(201).json({ 
      message: "Review created successfully", 
      review 
    });
  } catch (error) {
    console.error("Error creating review:", error);
    return res.status(500).json({ 
      message: "Error creating review", 
      error: error.message 
    });
  }
};

/**
 * Get all reviews
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
const getReviews = async (req, res) => {
  try {
    const reviews = await prisma.review.findMany();
    return res.status(200).json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return res.status(500).json({ 
      message: "Error fetching reviews", 
      error: error.message 
    });
  }
};

/**
 * Update a review by ID
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
const updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { profileUrl, name, description } = req.body;

    if (!id) {
      return res.status(400).json({ 
        message: "Review ID is required" 
      });
    }

    if (!profileUrl && !name && !description) {
      return res.status(400).json({ 
        message: "At least one field to update is required" 
      });
    }

    const review = await prisma.review.update({
      where: { id },
      data: { 
        ...(profileUrl && { profileUrl }),
        ...(name && { name }),
        ...(description && { description })
      },
    });

    return res.status(200).json({ 
      message: "Review updated successfully", 
      review 
    });
  } catch (error) {
    console.error("Error updating review:", error);
    return res.status(500).json({ 
      message: "Error updating review", 
      error: error.message 
    });
  }
};

/**
 * Delete a review by ID
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ 
        message: "Review ID is required" 
      });
    }

    await prisma.review.delete({
      where: { id },
    });

    return res.status(200).json({ 
      message: "Review deleted successfully" 
    });
  } catch (error) {
    console.error("Error deleting review:", error);
    return res.status(500).json({ 
      message: "Error deleting review", 
      error: error.message 
    });
  }
};

export {
  createReview,
  getReviews,
  updateReview,
  deleteReview
};