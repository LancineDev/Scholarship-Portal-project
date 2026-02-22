import axios from "axios";

const API_BASE_URL = "https://scholarship-portalbd-server.vercel.app";

const verifyAll = async () => {
  try {
    const res = await axios.get(`${API_BASE_URL}/top-scholarships`);
    const scholarships = res.data || [];

    console.log(`\n📊 Total Scholarships: ${scholarships.length}\n`);
    console.log("University Name | Country | Scholarship Category | Degree\n" + "─".repeat(80));

    scholarships.forEach((s) => {
      const name = (s.university_name || "Unknown").substring(0, 25).padEnd(25);
      const country = (s.university_location?.country || "?").padEnd(6);
      const category = (s.scholarship_category || "?").padEnd(20);
      const degree = s.degree_name || "?";
      console.log(`${name} | ${country} | ${category} | ${degree}`);
    });

    console.log("\n✨ All scholarships loaded successfully!");
  } catch (error) {
    console.error("Error:", error.message);
  }
};

verifyAll();
