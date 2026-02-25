import axios from "axios";

const API_BASE_URL = "https://scholarship-portalbd-server.vercel.app";

const scholarships = [
  {
    scholarship_name: "Example Scholarship A",
    university_name: "Example University",
    university_logo: "https://example.com/logo-a.png",
    university_country: "USA",
    university_city: "New York",
    subject_category: "STEM",
    scholarship_category: "Partial",
    degree: "Masters",
    tuition_fees: 1000,
    application_deadline: "2026-02-01",
    scholarship_description: "An example scholarship.",
    official_link: "https://example.com/a",
    posted_user_email: "portal@gmail.com"
  }
];

const run = async () => {
  for (const s of scholarships) {
    try {
      await axios.post(`${API_BASE_URL}/scholarships`, s);
      console.log(`Added ${s.scholarship_name}`);
    } catch (err) {
      console.error(`Failed ${s.scholarship_name}`, err.message);
    }
  }
};

run();
