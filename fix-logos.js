import axios from "axios";

const API_BASE_URL = "https://scholarship-portalbd-server.vercel.app";
const ADMIN_EMAIL = "portal@gmail.com";

const newScholarships = [
  {
    scholarship_name: "Programme ILEDA 2026 - Incubation Verte",
    university_name: "Fondation Gnidehoue (Incubateur)",
    university_logo: "https://via.placeholder.com/200x200/2E7D32/FFFFFF?text=Green+Eco",
    university_country: "Bénin",
    university_city: "Bénin (Régional)",
    university_rank: "N/A",
    subject_category: "Économie Verte, Agriculture, Développement Durable",
    scholarship_category: "Full Funding",
    degree: "Entrepreneures",
    tuition_fees: 0,
    application_fees: 0,
    service_charge: 0,
    application_deadline: "2026-03-13",
    scholarship_description: "Soutien à l'entrepreneuriat féminin durable via un programme d'incubation complet pour les projets à fort impact environnemental. Offre accompagnement entrepreneurial, financement de projet et mentorat pour les startups et coopératives africaines.",
    official_link: "https://afri-carrieres.com/2026/02/programme-ileda.html",
    posted_user_email: ADMIN_EMAIL
  },
  {
    scholarship_name: "SDGs Campus Ambassador Programme (Cohorte 5)",
    university_name: "Réseau Campus ODD Afrique",
    university_logo: "https://via.placeholder.com/200x200/1976D2/FFFFFF?text=SDGs",
    university_country: "Virtuel",
    university_city: "Panafricain",
    university_rank: "N/A",
    subject_category: "Leadership, Plaidoyer, Développement Durable",
    scholarship_category: "Full Funding",
    degree: "Étudiants",
    tuition_fees: 0,
    application_fees: 0,
    service_charge: 0,
    application_deadline: "2026-03-15",
    scholarship_description: "Programme intensif de 10 semaines pour former les futurs leaders africains au plaidoyer et à la mise en œuvre de projets communautaires. Formation gratuite en leadership, ODD, et développement durable. Ouvert aux étudiants âgés de 16-25 ans.",
    official_link: "https://afri-carrieres.com/2026/02/sdgs-campus-ambassador-programme-2.html",
    posted_user_email: ADMIN_EMAIL
  }
];

const readdScholarships = async () => {
    console.log("🖼️ Fixing scholarship logos with better image URLs...\n");

    try {
        // Delete old ones and re-add with new logos
        for (const scholarship of newScholarships) {
            try {
                // First try to find and delete
                const res = await axios.get(`${API_BASE_URL}/top-scholarships`);
                const existing = res.data.find(s => s.scholarship_name === scholarship.scholarship_name);

                if (existing) {
                    console.log(`Found: ${scholarship.scholarship_name}`);
                    console.log(`Old logo: ${existing.university_logo}`);
                    console.log(`New logo: ${scholarship.university_logo}`);
                }

                // Re-add with new logo
                const response = await axios.post(
                    `${API_BASE_URL}/scholarships`,
                    scholarship,
                    {
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }
                );

                if (response.status === 200 || response.status === 201) {
                    console.log(`✅ Readded: ${scholarship.scholarship_name}\n`);
                }
            } catch (err) {
                console.error(
                    `⚠️ Note: ${scholarship.scholarship_name}`,
                    err.response?.data?.message || err.message
                );
            }
        }

        console.log("✨ Done! Logos have been updated");
    } catch (err) {
        console.error("❌ Error:", err.message);
    }
};

readdScholarships();
