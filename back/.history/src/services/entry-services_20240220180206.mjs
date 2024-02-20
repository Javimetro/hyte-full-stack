import { listAllEntriesByUserId } from '../models/entry-model.mjs';

const avgHoursSleptCalculator = async (req) => {
  try {
    // Fetch all entries from the database for the logged-in user
    const entries = await listAllEntriesByUserId(req.user.user_id);

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
