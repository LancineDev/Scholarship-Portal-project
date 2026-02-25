import axios from "axios";

const API_BASE_URL = "https://scholarship-portalbd-server.vercel.app";

const run = async () => {
  try {
    const res = await axios.get(`${API_BASE_URL}/scholarships`);
    const items = res.data || [];

    for (const it of items) {
      if (it.scholarship_description && it.scholarship_description.length < 100) {
        try {
          await axios.put(`${API_BASE_URL}/scholarships/${it._id}`, {
            ...it,
            scholarship_description: it.scholarship_description + " - Description updated."
          });
          console.log(`Expanded ${it._id}`);
        } catch (e) {
          // ignore
        }
      }
    }

    console.log("Expand descriptions done");
  } catch (err) {
    console.error(err.message);
  }
};

run();
