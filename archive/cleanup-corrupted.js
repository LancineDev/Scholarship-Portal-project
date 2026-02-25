import axios from "axios";

const API_BASE_URL = "https://scholarship-portalbd-server.vercel.app";

const run = async () => {
  try {
    const res = await axios.get(`${API_BASE_URL}/scholarships`);
    const list = res.data || [];
    let removed = 0;

    for (const item of list) {
      if (!item.scholarship_name || !item.university_name) {
        try {
          await axios.delete(`${API_BASE_URL}/scholarships/${item._id}`);
          removed++;
          console.log(`Removed corrupted entry: ${item._id}`);
        } catch (e) {
          // ignore
        }
      }
    }

    console.log(`Cleanup done. Removed ${removed} items.`);
  } catch (err) {
    console.error(err.message);
  }
};

run();
