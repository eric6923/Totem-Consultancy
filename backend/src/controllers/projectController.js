import prisma from "../../prisma/client.js";


export const createProject = async (req, res) => {
    const { mediaUrl, mediaType, categoryId } = req.body;
  
    try {
      const newProject = await prisma.project.create({
        data: {
          mediaUrl,
          mediaType,
          categoryId,
        },
      });
  
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
  
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting project:', error);
      res.status(500).json({ error: 'Failed to delete project' });
    }
  };
  