import axios from "axios";

const API_BASE_URL = "https://scholarship-portalbd-server.vercel.app";

const scholarshipsToAdd = [
  {
    scholarship_name: "New Horizons Fellowship",
    university_name: "International University",
    university_logo: "https://example.com/logo1.png",
    university_country: "Global",
    university_city: "Virtual",
    university_rank: "Top 200",
    subject_category: "Interdisciplinary Studies",
    scholarship_category: "Full Funding",
    degree: "Masters",
    tuition_fees: 0,
    application_fees: 0,
    service_charge: 0,
    application_deadline: "2026-05-01",
    scholarship_description: "A fellowship for global changemakers.",
    official_link: "https://example.com/new-horizons",
    posted_user_email: "portal@gmail.com"
  }
];

const run = async () => {
  for (const scholarship of scholarshipsToAdd) {
    try {
      const res = await axios.post(`${API_BASE_URL}/scholarships`, scholarship);
      console.log(`Added: ${scholarship.scholarship_name}`);
    } catch (err) {
      console.error(`Failed to add: ${scholarship.scholarship_name}`);
    }
  }
};

run();
import axios from "axios";

const API_BASE_URL = "https://scholarship-portalbd-server.vercel.app";
const ADMIN_EMAIL = "portal@gmail.com";

const newScholarships = [
  {
    scholarship_name: "ADB-JSP Scholarship",
    university_name: "University of Tokyo",
    university_logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/University_of_Tokyo_logo.svg/1200px-University_of_Tokyo_logo.svg.png",
    university_country: "Japan",
    university_city: "Tokyo",
    university_rank: "#28 QS",
    subject_category: "Science, Technology, Engineering & Mathematics (STEM)",
    scholarship_category: "Full Funding",
    degree: "Masters",
    tuition_fees: 0,
    application_fees: 0,
    service_charge: 0,
    application_deadline: "2026-02-28",
    scholarship_description: "Pour les citoyens des pays membres de l'ADB souhaitant étudier au Japon ou en Asie. Asian Development Bank Scholarship Program sponsoring Master's students from developing countries.",
    official_link: "https://www.adb.org/work-with-us/careers/japan-scholarship-program"
  },
  {
    scholarship_name: "Programme d'Excellence Eiffel",
    university_name: "Sorbonne University",
    university_logo: "https://upload.wikimedia.org/wikipedia/fr/thumb/c/c3/Logo_Campus_France.svg/1200px-Logo_Campus_France.svg.png",
    university_country: "France",
    university_city: "Paris",
    university_rank: "#53 QS",
    subject_category: "Multi-disciplinary",
    scholarship_category: "Full Funding",
    degree: "Masters",
    tuition_fees: 0,
    application_fees: 0,
    service_charge: 0,
    application_deadline: "2026-12-15",
    scholarship_description: "Bourse d'élite du gouvernement français offrant environ 1 200€/mois pour le Master et 1 800€/mois pour le Doctorat. Excellent program for international students in French institutions.",
    official_link: "https://www.campusfrance.org/fr/le-programme-de-bourses-eiffel"
  },
  {
    scholarship_name: "Bourses de la Confédération Suisse",
    university_name: "ETH Zurich",
    university_logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Eidgen%C3%B6ssisches_Departement_f%C3%BCr_Ausw%C3%A4rtige_Angelegenheiten_Logo.svg/1200px-Eidgen%C3%B6ssisches_Departement_f%C3%BCr_Ausw%C3%A4rtige_Angelegenheiten_Logo.svg.png",
    university_country: "Switzerland",
    university_city: "Zurich",
    university_rank: "#7 QS",
    subject_category: "STEM / Arts",
    scholarship_category: "Full Funding",
    degree: "PhD",
    tuition_fees: 0,
    application_fees: 0,
    service_charge: 0,
    application_deadline: "2026-11-15",
    scholarship_description: "Financement complet pour les chercheurs d'excellence souhaitant rejoindre la Suisse. Swiss government excellence scholarships for research and postdoctoral studies.",
    official_link: "https://www.sbfi.admin.ch/bourses-suisse"
  },
  {
    scholarship_name: "Fulbright Scholarship USA",
    university_name: "Harvard University",
    university_logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Fulbright_Program_logo.svg/1200px-Fulbright_Program_logo.svg.png",
    university_country: "USA",
    university_city: "Cambridge, MA",
    university_rank: "#4 QS",
    subject_category: "Multi-disciplinary",
    scholarship_category: "Full Funding",
    degree: "Masters",
    tuition_fees: 0,
    application_fees: 0,
    service_charge: 0,
    application_deadline: "2026-10-31",
    scholarship_description: "Le programme d'échange le plus célèbre des USA. Très sélectif. The most prestigious US scholarship program for international students.",
    official_link: "https://foreign.fulbrightonline.org/"
  },
  {
    scholarship_name: "Chevening UK Government Scholarship",
    university_name: "University of Oxford",
    university_logo: "https://upload.wikimedia.org/wikipedia/en/thumb/2/22/Chevening_logo.svg/1200px-Chevening_logo.svg.png",
    university_country: "UK",
    university_city: "Oxford",
    university_rank: "#3 QS",
    subject_category: "Multi-disciplinary",
    scholarship_category: "Full Funding",
    degree: "Masters",
    tuition_fees: 0,
    application_fees: 0,
    service_charge: 0,
    application_deadline: "2026-11-05",
    scholarship_description: "Bourse complète pour les futurs leaders. Exige 2 ans d'expérience professionnelle minimum. Prestigious UK government scholarship for leaders.",
    official_link: "https://www.chevening.org/"
  },
  {
    scholarship_name: "CSC Bilateral Program",
    university_name: "Tsinghua University",
    university_logo: "https://upload.wikimedia.org/wikipedia/en/thumb/0/08/CSC_Logo.png/250px-CSC_Logo.png",
    university_country: "China",
    university_city: "Beijing",
    university_rank: "#14 QS",
    subject_category: "Multi-disciplinary",
    scholarship_category: "Full Funding",
    degree: "Masters",
    tuition_fees: 0,
    application_fees: 0,
    service_charge: 0,
    application_deadline: "2026-12-30",
    scholarship_description: "Financement massif du gouvernement chinois. Chinese Government Scholarship offering comprehensive sponsorship for international students.",
    official_link: "https://www.campuschina.org/"
  }
];

const addNewScholarships = async () => {
  try {
    console.log("🚀 Adding new scholarships...\n");

    // First, fetch existing scholarships to avoid duplicates
    const existingRes = await axios.get(`${API_BASE_URL}/top-scholarships`);
    const existing = existingRes.data || [];
    
    console.log(`📊 Current scholarships in database: ${existing.length}\n`);

    for (const scholarship of newScholarships) {
      // Check if this scholarship already exists
      const exists = existing.find(s => s.university_name === scholarship.university_name);
      
      if (exists) {
        console.log(`⏭️  Skipped: ${scholarship.university_name} (already exists)`);
        continue;
      }

      const todayDate = new Date().toISOString().split("T")[0];

      const scholarshipData = {
        university_name: scholarship.university_name,
        university_logo: scholarship.university_logo,
        scholarship_category: scholarship.scholarship_category,
        university_location: {
          country: scholarship.university_country,
          city: scholarship.university_city,
        },
        application_deadline: scholarship.application_deadline,
        subject_name: scholarship.subject_category,
        scholarship_description: scholarship.scholarship_description,
        post_date: todayDate,
        stipend: scholarship.tuition_fees,
        university_rank: scholarship.university_rank,
        service_charge: scholarship.service_charge,
        application_fees: scholarship.application_fees,
        degree_name: scholarship.degree,
        posted_user_email: ADMIN_EMAIL,
        official_link: scholarship.official_link,
      };

      try {
        const response = await axios.post(
          `${API_BASE_URL}/scholarships`,
          scholarshipData
        );

        if (response.status === 200) {
          console.log(`✅ Added: ${scholarship.university_name} (${scholarship.degree})`);
        }
      } catch (error) {
        console.log(
          `❌ Error: ${scholarship.university_name}:`,
          error.response?.data?.message || error.message
        );
      }
    }

    console.log("\n✨ Done! All new scholarships processed");
    
    // Final count
    const finalRes = await axios.get(`${API_BASE_URL}/top-scholarships`);
    console.log(`\n📊 Total scholarships now: ${finalRes.data.length}`);
  } catch (error) {
    console.error("Error:", error.message);
  }
};

addNewScholarships();
