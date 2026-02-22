import axios from "axios";

const API_BASE_URL = "https://scholarship-portalbd-server.vercel.app";

const cleanupCorruptedRecords = async () => {
  try {
    console.log("🧹 Cleaning up corrupted scholarship records...\n");

    // Fetch all scholarships
    const res = await axios.get(`${API_BASE_URL}/top-scholarships`);
    const allScholarships = res.data || [];

    console.log(`📊 Total scholarships fetched: ${allScholarships.length}`);

    // Find corrupted records (missing critical fields)
    const corrupted = allScholarships.filter(
      (s) => !s.university_name || !s.scholarship_category || !s.degree_name
    );

    if (corrupted.length === 0) {
      console.log("✅ No corrupted records found!");
      return;
    }

    console.log(`\n🔴 Found ${corrupted.length} corrupted records to delete:\n`);

    for (const scholarship of corrupted) {
      try {
        await axios.delete(
          `${API_BASE_URL}/top-scholarships/${scholarship._id}`
        );
        console.log(`✅ Deleted ID: ${scholarship._id}`);
      } catch (error) {
        console.log(`❌ Error deleting ${scholarship._id}:`, error.message);
      }
    }

    console.log("\n✨ Cleanup complete!");

    // Verify
    const verifyRes = await axios.get(`${API_BASE_URL}/top-scholarships`);
    console.log(`\n📊 Total scholarships after cleanup: ${verifyRes.data.length}`);
  } catch (error) {
    console.error("Error:", error.message);
  }
};

cleanupCorruptedRecords();
