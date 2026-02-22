import axios from "axios";

const API_BASE_URL = "https://scholarship-portalbd-server.vercel.app";

const checkScholarships = async () => {
  try {
    console.log("🔍 Fetching scholarships...\n");
    const response = await axios.get(`${API_BASE_URL}/top-scholarships`);
    const scholarships = response.data;

    console.log(`Found ${scholarships.length} scholarships\n`);
    
    // Show first 5 scholarship names to understand structure
    scholarships.slice(0, 10).forEach((s, i) => {
      console.log(`${i + 1}. Name: "${s.scholarship_name}" | ID: ${s._id}`);
    });

    // Look for our added scholarships
    console.log("\n🔎 Looking for newly added scholarships:\n");
    const ourScholarships = scholarships.filter(s => 
      s.scholarship_name?.includes("ICCR") || 
      s.scholarship_name?.includes("Türkiye") || 
      s.scholarship_name?.includes("Ireland") ||
      s.scholarship_name?.includes("Bristol") ||
      s.scholarship_name?.includes("GREAT") ||
      s.university_name?.includes("Delhi") ||
      s.university_name?.includes("METU") ||
      s.university_name?.includes("Trinity") ||
      s.university_name?.includes("Bristol")
    );

    console.log(`Found ${ourScholarships.length} of our scholarships:\n`);
    ourScholarships.forEach(s => {
      console.log(`Name: "${s.scholarship_name}"`);
      console.log(`University: "${s.university_name}"`);
      console.log(`ID: ${s._id}`);
      console.log(`---`);
    });

  } catch (error) {
    console.error("Error:", error.message);
  }
};

checkScholarships();
