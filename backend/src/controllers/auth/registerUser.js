import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import prisma from "../../../prisma/client.js";

/**
 * Validates email format
 * @param {string} email 
 * @returns {boolean}
 */
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validates password strength
 * @param {string} password 
 * @returns {boolean}
 */
const isStrongPassword = (password) => {
  return password.length >= 8;  // Add more password rules as needed
};

/**
 * Register a new admin
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
const registerAdmin = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Validate required fields
    if (!email || !password || !name) {
      return res.status(400).json({
        message: "Email, password, and name are required"
      });
    }

    // Validate email format
    if (!isValidEmail(email)) {
      return res.status(400).json({
        message: "Invalid email format"
      });
    }

    // Validate password strength
    if (!isStrongPassword(password)) {
      return res.status(400).json({
        message: "Password must be at least 8 characters long"
      });
    }

    // Validate name length
    if (name.length < 2 || name.length > 50) {
      return res.status(400).json({
        message: "Name must be between 2 and 50 characters"
      });
    }

    // Check if admin already exists
    const existingAdmin = await prisma.admin.findUnique({
      where: { email }
    });

    if (existingAdmin) {
      return res.status(409).json({
        message: "Email already registered"
      });
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new admin
    const admin = await prisma.admin.create({
      data: {
        email,
        password: hashedPassword,
        name
      },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true
      }  // Exclude password from response
    });

    // Generate JWT token
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      console.error("JWT_SECRET is not defined in environment variables");
      return res.status(500).json({
        message: "Internal server error"
      });
    }

    const token = jwt.sign(
      {
        id: admin.id,
        role: "admin"
      },
      jwtSecret,
      {
        expiresIn: process.env.EXPIRES_IN || '24h'
      }
    );

    return res.status(201).json({
      message: "Admin registered successfully",
      admin,
      token
    });

  } catch (error) {
    console.error("Admin registration error:", error);
    return res.status(500).json({
      message: "An error occurred while registering admin",
      error: error.message
    });
  }
};

export { registerAdmin };