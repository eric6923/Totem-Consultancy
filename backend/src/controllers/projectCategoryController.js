import prisma from "../../prisma/client.js";

export const createCategory = async (req, res) => {
    const { name, imageUrl } = req.body;
  
    try {
      const newCategory = await prisma.projectCategory.create({
        data: {
          name,
          imageUrl,
        },
      });
  
      res.status(201).json(newCategory);
    } catch (error) {
      console.error('Error creating category:', error);
      res.status(500).json({ error: 'Failed to create category' });
    }
  };

  
  export const getAllCategories = async (req, res) => {
    try {
      const categories = await prisma.projectCategory.findMany({
        include: { projects: true }, // Fetch associated projects
      });
  
      res.status(200).json(categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
      res.status(500).json({ error: 'Failed to fetch categories' });
    }
  };

  export const getCategoryById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const category = await prisma.projectCategory.findUnique({
        where: { id },
        include: { projects: true }, // Fetch associated projects
      });
  
      if (!category) {
        return res.status(404).json({ error: 'Category not found' });
      }
  
      res.status(200).json(category);
    } catch (error) {
      console.error('Error fetching category by ID:', error);
      res.status(500).json({ error: 'Failed to fetch category' });
    }
  };

  
  export const updateCategory = async (req, res) => {
    const { id } = req.params;
    const { name, imageUrl } = req.body;
  
    try {
      const existingCategory = await prisma.projectCategory.findUnique({
        where: { id },
      });
  
      if (!existingCategory) {
        return res.status(404).json({ error: 'Category not found' });
      }
  
      const updatedCategory = await prisma.projectCategory.update({
        where: { id },
        data: { name, imageUrl },
      });
  
      res.status(200).json(updatedCategory);
    } catch (error) {
      console.error('Error updating category:', error);
      res.status(500).json({ error: 'Failed to update category' });
    }
  };

  
  export const deleteCategory = async (req, res) => {
    const { id } = req.params;
  
    try {
      const existingCategory = await prisma.projectCategory.findUnique({
        where: { id },
      });
  
      if (!existingCategory) {
        return res.status(404).json({ error: 'Category not found' });
      }
  
      await prisma.projectCategory.delete({
        where: { id },
      });
  
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting category:', error);
      res.status(500).json({ error: 'Failed to delete category' });
    }
  };
  