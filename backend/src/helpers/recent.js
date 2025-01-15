import prisma from "../../prisma/client.js";

export const logRecentActivity = async (action, changesBy) => {
  try {
    await prisma.recentActivity.create({
      data: {
        action,
        changesBy,
      },
    });
  } catch (error) {
    console.error('Error logging recent activity:', error);
  }
};
