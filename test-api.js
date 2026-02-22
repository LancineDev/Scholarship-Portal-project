import axios from "axios";

const API_BASE_URL = "https://scholarship-portalbd-server.vercel.app";

const test = async () => {
  try {
    console.log("Testing /top-scholarships endpoint...\n");
    
    const res = await axios.get(`${API_BASE_URL}/top-scholarships`);
    
    console.log(`✅ Status: ${res.status}`);
    console.log(`📊 Scholarships returned: ${res.data?.length || 0}`);
    
    if (res.data && res.data.length > 0) {
      console.log("\n✅ API is working correctly!");
      console.log("\nFirst scholarship:");
      console.log(JSON.stringify(res.data[0], null, 2).substring(0, 500));
    } else {
      console.log("\n⚠️  No scholarships returned from API");
    }
  } catch (error) {
    console.error("❌ Error:", error.message);
    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Data:", error.response.data);
    }
  }
};

test();
