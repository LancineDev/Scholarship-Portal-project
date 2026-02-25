import axios from "axios";

const API_BASE_URL = "https://scholarship-portalbd-server.vercel.app";
const ADMIN_EMAIL = "portal@gmail.com";

const newScholarships = [
  {
    scholarship_name: "Innovation Seed Fund (ISF) 2026",
    university_name: "University of Oxford",
    university_logo: "https://www.ox.ac.uk/sites/default/files/oxford-logo.png",
    university_country: "Royaume-Uni",
    university_city: "Oxford",
    university_rank: "Top 5 (QS World Ranking)",
    subject_category: "Entrepreneuriat, Tech, Santé, Éducation",
    scholarship_category: "Full Funding",
    degree: "Bachelor / Masters / PhD",
    tuition_fees: 0,
    application_fees: 0,
    service_charge: 0,
    application_deadline: "2026-02-28",
    scholarship_description: "Prix de 5 000 £ destiné aux étudiants et jeunes innovateurs africains pour transformer des idées audacieuses en solutions concrètes pour le continent.",
    official_link: "https://afri-carrieres.com/2026/02/oxford-africa-conference-innovation-seed-fund.html",
    posted_user_email: ADMIN_EMAIL
  },
  {
    scholarship_name: "Programme UNIV'R 2026 (Couloir universitaire)",
    university_name: "Réseau des Universités Françaises",
    university_logo: "https://www.auf.org/wp-content/themes/auf/img/logo-auf.png",
    university_country: "France",
    university_city: "Plusieurs villes",
    university_rank: "Variable selon l'établissement",
    subject_category: "Toutes disciplines",
    scholarship_category: "Full Funding",
    degree: "Masters",
    tuition_fees: 0,
    application_fees: 0,
    service_charge: 0,
    application_deadline: "2026-03-15",
    scholarship_description: "Destiné aux étudiants réfugiés dans un premier pays d'asile souhaitant poursuivre un Master en France. Couvre les frais de vie et de scolarité.",
    official_link: "https://afri-carrieres.com/2026/02/programme-univr-france.html",
    posted_user_email: ADMIN_EMAIL
  },
  {
    scholarship_name: "Albert Einstein German Academic Refugee Initiative (DAFI)",
    university_name: "Universités locales",
    university_logo: "https://www.unhcr.org/sites/default/files/unhcr-logo.png",
    university_country: "Multi-pays",
    university_city: "Afrique, Asie, Amériques",
    university_rank: "N/A",
    subject_category: "Toutes disciplines",
    scholarship_category: "Full Funding",
    degree: "Bachelor",
    tuition_fees: 0,
    application_fees: 0,
    service_charge: 0,
    application_deadline: "2026-06-30",
    scholarship_description: "Permet aux jeunes réfugiés d'obtenir un diplôme universitaire dans leur pays d'accueil. Inclut frais de scolarité, logement et mentorat.",
    official_link: "https://afri-carrieres.com/2026/02/programme-de-bourses-dafi.html",
    posted_user_email: ADMIN_EMAIL
  },
  {
    scholarship_name: "Programme ILEDA 2026 - Incubation Verte",
    university_name: "Fondation Gnidehoue (Incubateur)",
    university_logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Benin_Flag_Map.svg/1200px-Benin_Flag_Map.svg.png",
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
    scholarship_description: "Soutien à l'entrepreneuriat féminin durable via un programme d'incubation complet pour les projets à fort impact environnemental.",
    official_link: "https://afri-carrieres.com/2026/02/programme-ileda.html",
    posted_user_email: ADMIN_EMAIL
  },
  {
    scholarship_name: "Romania Government Scholarship 2026",
    university_name: "Universités Publiques de Roumanie",
    university_logo: "https://www.mae.ro/sites/default/files/mae_logo.png",
    university_country: "Roumanie",
    university_city: "Bucarest, Cluj, Iasi",
    university_rank: "Top 500-1000",
    subject_category: "Toutes disciplines",
    scholarship_category: "Full Funding",
    degree: "Bachelor / Masters / PhD",
    tuition_fees: 0,
    application_fees: 0,
    service_charge: 0,
    application_deadline: "2026-03-31",
    scholarship_description: "Exemption de frais de scolarité, logement universitaire, allocation mensuelle et année préparatoire linguistique offerte.",
    official_link: "https://afri-carrieres.com/2026/02/bourses-du-gouvernement-roumain.html",
    posted_user_email: ADMIN_EMAIL
  },
  {
    scholarship_name: "SDGs Campus Ambassador Programme (Cohorte 5)",
    university_name: "Réseau Campus ODD Afrique",
    university_logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/SDG_Logo_EN_2.png/1200px-SDG_Logo_EN_2.png",
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
    scholarship_description: "Programme intensif de 10 semaines pour former les futurs leaders africains au plaidoyer et à la mise en œuvre de projets communautaires.",
    official_link: "https://afri-carrieres.com/2026/02/sdgs-campus-ambassador-programme-2.html",
    posted_user_email: ADMIN_EMAIL
  }
];

const deleteAndReadd = async () => {
    console.log("🖼️ Deleting old scholarships and re-adding with proper logos...\n");

    try {
        const existingRes = await axios.get(`${API_BASE_URL}/top-scholarships`);
        const scholarships = existingRes.data || [];

        // Delete the 6 scholarships with bad logos
        for (const newScholarship of newScholarships) {
            const existing = scholarships.find(s => s.scholarship_name === newScholarship.scholarship_name);
            
            if (existing) {
                try {
                    const deleteRes = await axios.delete(`${API_BASE_URL}/scholarships/${existing._id}`);
                    console.log(`🗑️ Deleted: ${newScholarship.scholarship_name}`);
                } catch (err) {
                    console.log(`⚠️ Could not delete: ${newScholarship.scholarship_name}`);
                }
            }
        }

        console.log("\n✅ Now adding with proper logos...\n");

        // Re-add them
        for (const scholarship of newScholarships) {
            try {
                const response = await axios.post(
                    `${API_BASE_URL}/scholarships`,
                    scholarship,
                    {
                        headers: { "Content-Type": "application/json" }
                    }
                );

                if (response.status === 200 || response.status === 201) {
                    console.log(`✅ Added with logo: ${scholarship.scholarship_name}`);
                }
            } catch (err) {
                console.error(`❌ Error: ${scholarship.scholarship_name}`, err.response?.data?.message || "");
            }
        }

        console.log("\n✨ Done! All scholarships now have proper images!");
    } catch (err) {
        console.error("❌ Error:", err.message);
    }
};

deleteAndReadd();
