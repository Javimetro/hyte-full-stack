import { listAllEntriesByUserId } from '../entry-models.mjs';

const avgHoursSleptCalculator = async (userId) => {
  try {
    // Fetch all entries from the database
    const entries = await listAllEntriesByUserId(userId);

    // Calculate average hours slept by user
    const totalHours = entries.reduce((acc, entry) => acc + entry.sleep_hours, 0);
    const averageHoursSlept = totalHours / entries.length;

    return averageHoursSlept;
  } catch (error) {
    console.error('Error calculating average hours slept:', error);
    throw error;
  }
};

export { avgHoursSleptCalculator };
