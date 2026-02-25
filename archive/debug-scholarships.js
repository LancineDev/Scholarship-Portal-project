import axios from "axios";

const API_BASE_URL = "https://scholarship-portalbd-server.vercel.app";

const run = async () => {
  try {
    const res = await axios.get(`${API_BASE_URL}/scholarships`);
    console.log(JSON.stringify(res.data.slice(0, 5), null, 2));
  } catch (err) {
    console.error(err.message);
  }
};

run();
