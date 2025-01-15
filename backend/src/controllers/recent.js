import prisma from "../../prisma/client.js";


export const getRecentActivities = async (req, res) => {
    try {
      const activities = await prisma.recentActivity.findMany({
        orderBy: { createdAt: 'desc' }, // Sort by most recent first
      });

      res.status(200).json(activities);
    } catch (error) {
      console.error('Error fetching recent activities:', error);
      res.status(500).json({ error: 'Failed to fetch recent activities' });
    }
  };
  