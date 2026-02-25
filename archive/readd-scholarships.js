import axios from "axios";

const API_BASE_URL = "https://scholarship-portalbd-server.vercel.app";

const scholarships = [
  {
    scholarship_name: "Re-added Scholarship",
    university_name: "Re-Example University",
    university_logo: "https://example.com/re-logo.png",
    university_country: "Global",
    university_city: "Virtual",
    subject_category: "Arts",
    scholarship_category: "Full Funding",
    degree: "Undergraduate",
    tuition_fees: 0,
    application_deadline: "2026-06-01",
    scholarship_description: "Re-adding example scholarship.",
    official_link: "https://example.com/re",
    posted_user_email: "portal@gmail.com"
  }
];

const run = async () => {
  for (const s of scholarships) {
    try {
      await axios.post(`${API_BASE_URL}/scholarships`, s);
      console.log(`Added ${s.scholarship_name}`);
    } catch (err) {
      console.error(err.message);
    }
  }
};

run();
