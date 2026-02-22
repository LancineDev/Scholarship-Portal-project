import axios from "axios";

const API_BASE_URL = "https://scholarship-portalbd-server.vercel.app";

const checkNewScholarships = async () => {
  try {
    console.log("🔍 Fetching all scholarships to debug...\n");
    const response = await axios.get(`${API_BASE_URL}/top-scholarships`);
    const scholarships = response.data;

    console.log(`Total: ${scholarships.length} scholarships\n`);

    // Find our 5 new scholarships
    const newOnes = scholarships.filter(s => 
      s.university_name?.includes("Delhi") || 
      s.university_name?.includes("METU") || 
      s.university_name?.includes("Trinity") ||
      s.university_name?.includes("Bristol") ||
      s.university_name?.includes("British Council")
    );

    console.log(`Found ${newOnes.length} new scholarships:\n`);
    
    newOnes.forEach((s, i) => {
      console.log(`${i + 1}. ${s.university_name}`);
      console.log(`   - scholarship_category: ${s.scholarship_category}`);
      console.log(`   - subject_name: ${s.subject_name}`);
      console.log(`   - degree_name: ${s.degree_name}`);
      console.log(`   - application_fees: ${s.application_fees}`);
      console.log(`   - scholarship_description: ${(s.scholarship_description || "").substring(0, 50)}...`);
      console.log(`   - ID: ${s._id}\n`);
    });

    // Check for undefined fields
    console.log("\n⚠️  Scholarships with missing critical fields:\n");
    scholarships.forEach(s => {
      if (!s.scholarship_category || !s.degree_name) {
        console.log(`- ${s.university_name}`);
        console.log(`  Missing: ${ !s.scholarship_category ? "scholarship_category" : ""} ${!s.degree_name ? "degree_name" : ""}`);
      }
    });

  } catch (error) {
    console.error("Error:", error.message);
  }
};

checkNewScholarships();
