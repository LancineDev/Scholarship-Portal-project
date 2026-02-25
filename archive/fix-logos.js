import axios from "axios";

const API_BASE_URL = "https://scholarship-portalbd-server.vercel.app";

const logos = {
  "Example University": "https://example.com/logo-ex.png",
  "International University": "https://example.com/logo-intl.png"
};

const run = async () => {
  try {
    const res = await axios.get(`${API_BASE_URL}/scholarships`);
    const items = res.data || [];

    for (const it of items) {
      if (logos[it.university_name]) {
        try {
          await axios.put(`${API_BASE_URL}/scholarships/${it._id}`, {
            ...it,
            university_logo: logos[it.university_name]
          });
          console.log(`Logo fixed for ${it.university_name}`);
        } catch (e) {
          // ignore
        }
      }
    }

    console.log("fix-logos done");
  } catch (err) {
    console.error(err.message);
  }
};

run();
