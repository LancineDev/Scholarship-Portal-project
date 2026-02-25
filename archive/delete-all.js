import axios from "axios";

const API_BASE_URL = "https://scholarship-portalbd-server.vercel.app";

const run = async () => {
  try {
    const res = await axios.get(`${API_BASE_URL}/scholarships`);
    const items = res.data || [];
    for (const it of items) {
      try {
        await axios.delete(`${API_BASE_URL}/scholarships/${it._id}`);
        console.log(`Deleted ${it._id}`);
      } catch (e) {
        // ignore
      }
    }
    console.log("Delete all completed");
  } catch (err) {
    console.error(err.message);
  }
};

run();
