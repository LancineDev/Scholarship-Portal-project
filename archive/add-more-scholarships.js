import axios from "axios";

const API_BASE_URL = "https://scholarship-portalbd-server.vercel.app";

const scholarshipsToAdd = [
  {
    scholarship_name: "New Horizons Fellowship",
    university_name: "International University",
    university_logo: "https://example.com/logo1.png",
    university_country: "Global",
    university_city: "Virtual",
    university_rank: "Top 200",
    subject_category: "Interdisciplinary Studies",
    scholarship_category: "Full Funding",
    degree: "Masters",
    tuition_fees: 0,
    application_fees: 0,
    service_charge: 0,
    application_deadline: "2026-05-01",
    scholarship_description: "A fellowship for global changemakers.",
    official_link: "https://example.com/new-horizons",
    posted_user_email: "portal@gmail.com"
  }
];

const run = async () => {
  for (const scholarship of scholarshipsToAdd) {
    try {
      const res = await axios.post(`${API_BASE_URL}/scholarships`, scholarship);
      console.log(`Added: ${scholarship.scholarship_name}`);
    } catch (err) {
      console.error(`Failed to add: ${scholarship.scholarship_name}`);
    }
  }
};

run();
