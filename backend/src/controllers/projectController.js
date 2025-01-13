import prisma from "../../prisma/client.js";
import { logRecentActivity } from "../helpers/recent.js";


export const createProject = async (req, res) => {
  const { mediaUrl, categoryId } = req.body;
  const changesBy = req.user?.name || 'Unknown User';

  try {
    // Fetch the category name using the categoryId
    const category = await prisma.projectCategory.findUnique({
      where: { id: categoryId },
    });

    // Check if the category exists
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    // Create the project
    const newProject = await prisma.project.create({
      data: {
        mediaUrl,
        categoryId,
      },
    });

    // Log recent activity with the category name
    await logRecentActivity(`Added project in ${category.name}`, changesBy);

    res.status(201).json(newProject);
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ error: 'Failed to create project' });
  }
};

  
  export const getAllProjects = async (req, res) => {
    try {
      const projects = await prisma.project.findMany({
        include: { category: true }, // Fetch associated category
      });
  
      res.status(200).json(projects);
    } catch (error) {
      console.error('Error fetching projects:', error);
      res.status(500).json({ error: 'Failed to fetch projects' });
    }
  };

  
  export const getProjectById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const project = await prisma.project.findUnique({
        where: { id },
        include: { category: true }, // Fetch associated category
      });
  
      if (!project) {
        return res.status(404).json({ error: 'Project not found' });
      }
  
      res.status(200).json(project);
    } catch (error) {
      console.error('Error fetching project by ID:', error);
      res.status(500).json({ error: 'Failed to fetch project' });
    }
  };

  
  export const deleteProject = async (req, res) => {
    const { id } = req.params;
    const changesBy = req.user?.name || 'Unknown User';

  
    try {
      const existingProject = await prisma.project.findUnique({
        where: { id },
      });
  
      if (!existingProject) {
        return res.status(404).json({ error: 'Project not found' });
      }

      
  
      await prisma.project.delete({
        where: { id },
      });
      await logRecentActivity(`Created category: ${existingProject.name}`, changesBy);

  
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting project:', error);
      res.status(500).json({ error: 'Failed to delete project' });
    }
  };
  