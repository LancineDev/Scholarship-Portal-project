import axios from "axios";

const API_BASE_URL = "https://scholarship-portalbd-server.vercel.app";

const verifyTurkiye = async () => {
  try {
    const res = await axios.get(`${API_BASE_URL}/top-scholarships`);
    const scholarships = res.data || [];

    const turkiye = scholarships.find(
      (s) => s.university_name === "Middle East Technical University"
    );

    if (turkiye) {
      console.log("✅ Türkiye Scholarship FOUND:");
      console.log(JSON.stringify(turkiye, null, 2));
    } else {
      console.log("❌ Türkiye Scholarship NOT FOUND");
      console.log("\nSearching for similar names...");
      const similar = scholarships.filter(
        (s) => s.university_name?.includes("Middle") || s.university_name?.includes("Technical")
      );
      if (similar.length > 0) {
        console.log("Found similar:", similar.map((s) => s.university_name));
      } else {
        console.log("No similar university names found");
      }
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
};

verifyTurkiye();
