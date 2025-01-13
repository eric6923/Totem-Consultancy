import prisma from "../../prisma/client.js";
import { logRecentActivity } from "../helpers/recent.js";



export const getAllTeamMembers = async (req, res) => {
    try {
      const team = await prisma.team.findMany();
      res.status(200).json(team);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch team members' });
    }
  };
  
  // Get a specific team member by ID
  export const getTeamMemberById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const teamMember = await prisma.team.findUnique({
        where: { id }, // UUID is a string, no need to parse
      });
  
      if (!teamMember) {
        return res.status(404).json({ error: 'Team member not found' });
      }
  
      res.status(200).json(teamMember);
    } catch (error) {
      console.error('Error fetching team member by ID:', error);
      res.status(500).json({ error: 'Failed to fetch team member' });
    }
  };
  
  
  // Create a new team member
  export const createTeamMember = async (req, res) => {
    const { profileUrl, name, designation } = req.body;
    const changesBy = req.user?.name || 'Unknown User';

    try {
      const newTeamMember = await prisma.team.create({
        data: { profileUrl, name, designation },
      });
      await logRecentActivity(`Added Team member: ${name}`, changesBy);

      res.status(201).json(newTeamMember);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create team member' });
    }
  };
  
  // Update a team member
  export const updateTeamMember = async (req, res) => {
    const { id } = req.params;
    const { profileUrl, name, designation } = req.body;
    const changesBy = req.user?.name || 'Unknown User';

  
    try {
      // Ensure the team member exists
      const existingTeamMember = await prisma.team.findUnique({
        where: { id },
      });
  
      if (!existingTeamMember) {
        return res.status(404).json({ error: 'Team member not found' });
      }
  
      const updatedTeamMember = await prisma.team.update({
        where: { id },
        data: { profileUrl, name, designation },
      });

      await logRecentActivity(`Updated Team member: ${name}`, changesBy);

  
      res.status(200).json(updatedTeamMember);
    } catch (error) {
      console.error('Error updating team member:', error);
      res.status(500).json({ error: 'Failed to update team member' });
    }
  };
  
  
  // Delete a team member
  export const deleteTeamMember = async (req, res) => {
    const { id } = req.params;
    const changesBy = req.user?.name || 'Unknown User';

  
    try {
      // Ensure the team member exists
      const existingTeamMember = await prisma.team.findUnique({
        where: { id },
      });
  
      if (!existingTeamMember) {
        return res.status(404).json({ error: 'Team member not found' });
      }

      const name = existingTeamMember.name
  
      await prisma.team.delete({
        where: { id },
      });

      await logRecentActivity(`Deleted Team member: ${name}`, changesBy);

  
      res.status(204).send(); // No content on success
    } catch (error) {
      console.error('Error deleting team member:', error);
      res.status(500).json({ error: 'Failed to delete team member' });
    }
  };
  