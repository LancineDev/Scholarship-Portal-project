import axios from "axios";

const API_BASE_URL = "https://scholarship-portalbd-server.vercel.app";

const logoUpdates = [
  {
    scholarship_name: "Programme ILEDA 2026 - Incubation Verte",
    new_logo: "https://via.placeholder.com/200x200/2E7D32/FFFFFF?text=Gnidehoue"
  },
  {
    scholarship_name: "SDGs Campus Ambassador Programme (Cohorte 5)",
    new_logo: "https://via.placeholder.com/200x200/1976D2/FFFFFF?text=SDGs+Campus"
  }
];

const updateLogos = async () => {
    console.log("🖼️ Updating scholarship logos...\n");

    try {
        const existingRes = await axios.get(`${API_BASE_URL}/top-scholarships`);
        const scholarships = existingRes.data || [];
        console.log(`📊 Found ${scholarships.length} scholarships\n`);

        for (const update of logoUpdates) {
            const scholarship = scholarships.find(s => s.scholarship_name === update.scholarship_name);
            
            if (!scholarship) {
                console.log(`⏭️ Not found: ${update.scholarship_name}`);
                continue;
            }

            try {
                const response = await axios.patch(
                    `${API_BASE_URL}/scholarships/${scholarship._id}`,
                    { university_logo: update.new_logo },
                    {
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }
                );

                if (response.status === 200) {
                    console.log(`✅ Updated logo for: ${update.scholarship_name}`);
                } else {
                    console.error(`Failed to update: ${update.scholarship_name}`);
                }
            } catch (err) {
                console.error(
                    `❌ Error updating ${update.scholarship_name}:`,
                    err.response?.data || err.message
                );
            }
        }

        console.log("\n✨ Logo update completed!");
    } catch (err) {
        console.error("❌ Error:", err.message);
    }
};

updateLogos();
