import prisma from "../../prisma/client.js";
import { logRecentActivity } from "../helpers/recent.js";



export const createCourse = async (req, res) => {
    const { imageUrl, name, timePeriod, price } = req.body;
  
    try {
      const newCourse = await prisma.course.create({
        data: {
          imageUrl,
          name,
          timePeriod,
          price,
        },
      });
  
      res.status(201).json(newCourse);
    } catch (error) {
      console.error('Error creating course:', error);
      res.status(500).json({ error: 'Failed to create course' });
    }
  };

  
  export const getAllCourses = async (req, res) => {
    try {
      const courses = await prisma.course.findMany();
      res.status(200).json(courses);
    } catch (error) {
      console.error('Error fetching courses:', error);
      res.status(500).json({ error: 'Failed to fetch courses' });
    }
  };
  
  export const getCourseById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const course = await prisma.course.findUnique({
        where: { id },
      });
  
      if (!course) {
        return res.status(404).json({ error: 'Course not found' });
      }
  
      res.status(200).json(course);
    } catch (error) {
      console.error('Error fetching course by ID:', error);
      res.status(500).json({ error: 'Failed to fetch course' });
    }
  };

  
  export const updateCourse = async (req, res) => {
    const { id } = req.params;
    const { imageUrl, name, timePeriod, price } = req.body;
  
    try {
      const existingCourse = await prisma.course.findUnique({
        where: { id },
      });
  
      if (!existingCourse) {
        return res.status(404).json({ error: 'Course not found' });
      }
  
      const updatedCourse = await prisma.course.update({
        where: { id },
        data: {
          imageUrl,
          name,
          timePeriod,
          price,
        },
      });
  
      res.status(200).json(updatedCourse);
    } catch (error) {
      console.error('Error updating course:', error);
      res.status(500).json({ error: 'Failed to update course' });
    }
  };

  
  export const deleteCourse = async (req, res) => {
    const { id } = req.params;
  
    try {
      const existingCourse = await prisma.course.findUnique({
        where: { id },
      });
  
      if (!existingCourse) {
        return res.status(404).json({ error: 'Course not found' });
      }
  
      await prisma.course.delete({
        where: { id },
      });
  
      res.status(204).send(); // No content on success
    } catch (error) {
      console.error('Error deleting course:', error);
      res.status(500).json({ error: 'Failed to delete course' });
    }
  };
  