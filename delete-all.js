import axios from "axios";

const API_BASE_URL = "https://scholarship-portalbd-server.vercel.app";

const deleteAndRecreate = async () => {
  try {
    console.log("🔧 Removing all corrupted scholarships and recreating...\n");

    // Get all existing scholarships
    const res = await axios.get(`${API_BASE_URL}/top-scholarships`);
    const existing = res.data || [];

    console.log(`Found ${existing.length} scholarships to delete\n`);

    // Delete all
    for (const scholarship of existing) {
      try {
        await axios.delete(`${API_BASE_URL}/top-scholarships/${scholarship._id}`);
        console.log(`✅ Deleted: ${scholarship._id}`);
      } catch (error) {
        console.log(`❌ Error deleting ${scholarship._id}`);
      }
    }

    console.log("\n✨ All scholarships deleted!");
    console.log("Now run: node readd-scholarships.js && node add-more-scholarships.js\n");
  } catch (error) {
    console.error("Error:", error.message);
  }
};

deleteAndRecreate();
