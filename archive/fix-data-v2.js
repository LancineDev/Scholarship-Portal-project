import axios from "axios";

const API_BASE_URL = "https://scholarship-portalbd-server.vercel.app";

const run = async () => {
  try {
    const res = await axios.get(`${API_BASE_URL}/scholarships`);
    const items = res.data || [];

    for (const it of items) {
      // Example normalization
      if (typeof it.tuition_fees === 'string') {
        it.tuition_fees = parseFloat(it.tuition_fees.replace(/[^0-9.]/g, '')) || 0;
        try {
          await axios.put(`${API_BASE_URL}/scholarships/${it._id}`, it);
          console.log(`Normalized ${it._id}`);
        } catch (e) {
          // ignore
        }
      }
    }
    console.log('fix-data-v2 completed');
  } catch (err) {
    console.error(err.message);
  }
};

run();
