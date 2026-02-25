import axios from "axios";

const API_BASE_URL = "https://scholarship-portalbd-server.vercel.app";

const logoUpdates = [
  {
    scholarship_name: "Global Leaders Scholarship 2024",
    new_logo: "https://example.com/logos/global-leaders.png"
  },
  {
    scholarship_name: "Tech Innovators Award",
    new_logo: "https://example.com/logos/tech-innovators.png"
  }
];

const run = async () => {
  try {
    const res = await axios.get(`${API_BASE_URL}/top-scholarships`);
    const scholarships = res.data || [];

    for (const update of logoUpdates) {
      const existing = scholarships.find(s => s.scholarship_name === update.scholarship_name);
      if (!existing) continue;

      try {
        await axios.put(`${API_BASE_URL}/scholarships/${existing._id}`, {
          ...existing,
          university_logo: update.new_logo
        });
        console.log(`Updated logo for ${update.scholarship_name}`);
      } catch (err) {
        console.error(`Failed to update ${update.scholarship_name}`);
      }
    }
  } catch (err) {
    console.error(err.message);
  }
};

run();
