import axios from "axios";

const API_BASE_URL = "https://scholarship-portalbd-server.vercel.app";

const run = async () => {
  try {
    const res = await axios.get(`${API_BASE_URL}/top-scholarships`);
    const data = res.data || [];
    console.log(`Total scholarships: ${data.length}`);
  } catch (err) {
    console.error(err.message);
  }
};

run();
