import axios from "axios";

const API_BASE_URL = "https://scholarship-portalbd-server.vercel.app";

const run = async () => {
  try {
    const res = await axios.get(`${API_BASE_URL}/scholarships`);
    const items = res.data || [];
    for (const it of items) {
      let changed = false;
      if (!it.university_country) {
        it.university_country = "Unknown";
        changed = true;
      }
      if (!it.application_deadline) {
        it.application_deadline = "TBD";
        changed = true;
      }

      if (changed) {
        try {
          await axios.put(`${API_BASE_URL}/scholarships/${it._id}`, it);
          console.log(`Fixed ${it._id}`);
        } catch (e) {
          // ignore
        }
      }
    }
    console.log("Fix corrupt data completed");
  } catch (err) {
    console.error(err.message);
  }
};

run();
