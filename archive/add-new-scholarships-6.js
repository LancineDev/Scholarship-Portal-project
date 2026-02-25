import axios from "axios";

const API_BASE_URL = "https://scholarship-portalbd-server.vercel.app";

const newSch = [
  {
    scholarship_name: "Community Leaders Program",
    university_name: "City University",
    university_logo: "https://example.com/cls.png",
    university_country: "Kenya",
    university_city: "Nairobi",
    subject_category: "Leadership",
    scholarship_category: "Full Funding",
    degree: "Undergraduate",
    tuition_fees: 0,
    application_deadline: "2026-04-15",
    scholarship_description: "Support for community leaders to attend university.",
    official_link: "https://example.com/cls",
    posted_user_email: "portal@gmail.com"
  }
];

const run = async () => {
  for (const s of newSch) {
    try {
      await axios.post(`${API_BASE_URL}/scholarships`, s);
      console.log(`Added ${s.scholarship_name}`);
    } catch (err) {
      console.error(`Failed ${s.scholarship_name}:`, err.message);
    }
  }
};

run();
