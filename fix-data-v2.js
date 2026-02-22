import axios from "axios";

const API_BASE_URL = "https://scholarship-portalbd-server.vercel.app";
const ADMIN_EMAIL = "portal@gmail.com";

const completeScholarships = [
  {
    id: "699aac15c163d4151702bcf3",
    university_name: "University of Delhi",
    university_logo: "https://upload.wikimedia.org/wikipedia/en/thumb/8/84/University_of_Delhi.png/220px-University_of_Delhi.png",
    scholarship_category: "Full Funding",
    university_country: "India",
    university_city: "New Delhi",
    university_rank: "#407",
    subject_category: "Multi-disciplinary",
    degree: "Bachelor",
    tuition_fees: 0,
    application_fees: 0,
    service_charge: 0,
    application_deadline: "2026-04-15",
    official_link: "https://a2ascholarships.iccr.gov.in/"
  },
  {
    id: "699aac15c163d4151702bcf4",
    university_name: "Middle East Technical University",
    university_logo: "https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/Middle_East_Technical_University_Logo.png/200px-Middle_East_Technical_University_Logo.png",
    scholarship_category: "Full Funding",
    university_country: "Turkey",
    university_city: "Ankara",
    university_rank: "#336",
    subject_category: "Multi-disciplinary",
    degree: "Masters",
    tuition_fees: 0,
    application_fees: 0,
    service_charge: 0,
    application_deadline: "2026-02-25",
    official_link: "https://www.turkiyeburslari.gov.tr/"
  },
  {
    id: "699aac16c163d4151702bcf5",
    university_name: "Trinity College Dublin",
    university_logo: "https://upload.wikimedia.org/wikipedia/en/thumb/0/0d/Trinity_College_Dublin_logo.svg/1200px-Trinity_College_Dublin_logo.svg.png",
    scholarship_category: "Full Funding",
    university_country: "Ireland",
    university_city: "Dublin",
    university_rank: "#81",
    subject_category: "Multi-disciplinary",
    degree: "Masters",
    tuition_fees: 0,
    application_fees: 55,
    service_charge: 0,
    application_deadline: "2026-03-12",
    official_link: "https://hea.ie/policy/internationalisation/goi-ies/"
  },
  {
    id: "699aac16c163d4151702bcf6",
    university_name: "University of Bristol",
    university_logo: "https://upload.wikimedia.org/wikipedia/en/thumb/f/f0/University_of_Bristol_logo.svg/1200px-University_of_Bristol_logo.svg.png",
    scholarship_category: "Partial Funding",
    university_country: "UK",
    university_city: "Bristol",
    university_rank: "#54",
    subject_category: "Multi-disciplinary",
    degree: "Bachelor",
    tuition_fees: 6500,
    application_fees: 0,
    service_charge: 0,
    application_deadline: "2026-04-10",
    official_link: "https://www.bristol.ac.uk/international/fees-finance/scholarships/"
  },
  {
    id: "699aac16c163d4151702bcf7",
    university_name: "British Council Partner Universities",
    university_logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/British_Council_logo.png",
    scholarship_category: "Partial Funding",
    university_country: "UK",
    university_city: "London",
    university_rank: "Varies",
    subject_category: "Multi-disciplinary",
    degree: "Masters",
    tuition_fees: 10000,
    application_fees: 0,
    service_charge: 0,
    application_deadline: "2026-04-30",
    official_link: "https://study-uk.britishcouncil.org/scholarships-funding/great-scholarships"
  },
  {
    id: "699aac16c163d4151702bcf8",
    university_name: "University of Tokyo",
    university_logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/University_of_Tokyo_logo.svg/1200px-University_of_Tokyo_logo.svg.png",
    scholarship_category: "Full Funding",
    university_country: "Japan",
    university_city: "Tokyo",
    university_rank: "#28",
    subject_category: "Science, Technology, Engineering & Mathematics (STEM)",
    degree: "Masters",
    tuition_fees: 0,
    application_fees: 0,
    service_charge: 0,
    application_deadline: "2026-02-28",
    official_link: "https://www.adb.org/work-with-us/careers/japan-scholarship-program"
  },
  {
    id: "699aac16c163d4151702bcf9",
    university_name: "Sorbonne University",
    university_logo: "https://upload.wikimedia.org/wikipedia/fr/thumb/c/c3/Logo_Campus_France.svg/1200px-Logo_Campus_France.svg.png",
    scholarship_category: "Full Funding",
    university_country: "France",
    university_city: "Paris",
    university_rank: "#53",
    subject_category: "Multi-disciplinary",
    degree: "Masters",
    tuition_fees: 0,
    application_fees: 0,
    service_charge: 0,
    application_deadline: "2026-12-15",
    official_link: "https://www.campusfrance.org/fr/le-programme-de-bourses-eiffel"
  },
  {
    id: "699aac16c163d4151702bcfa",
    university_name: "ETH Zurich",
    university_logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Eidgen%C3%B6ssisches_Departement_f%C3%BCr_Ausw%C3%A4rtige_Angelegenheiten_Logo.svg/1200px-Eidgen%C3%B6ssisches_Departement_f%C3%BCr_Ausw%C3%A4rtige_Angelegenheiten_Logo.svg.png",
    scholarship_category: "Full Funding",
    university_country: "Switzerland",
    university_city: "Zurich",
    university_rank: "#7",
    subject_category: "STEM / Arts",
    degree: "PhD",
    tuition_fees: 0,
    application_fees: 0,
    service_charge: 0,
    application_deadline: "2026-11-15",
    official_link: "https://www.sbfi.admin.ch/bourses-suisse"
  },
  {
    id: "699aac16c163d4151702bcfb",
    university_name: "Harvard University",
    university_logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Fulbright_Program_logo.svg/1200px-Fulbright_Program_logo.svg.png",
    scholarship_category: "Full Funding",
    university_country: "USA",
    university_city: "Cambridge, MA",
    university_rank: "#4",
    subject_category: "Multi-disciplinary",
    degree: "Masters",
    tuition_fees: 0,
    application_fees: 0,
    service_charge: 0,
    application_deadline: "2026-10-31",
    official_link: "https://foreign.fulbrightonline.org/"
  },
  {
    id: "699aac16c163d4151702bcfc",
    university_name: "University of Oxford",
    university_logo: "https://upload.wikimedia.org/wikipedia/en/thumb/2/22/Chevening_logo.svg/1200px-Chevening_logo.svg.png",
    scholarship_category: "Full Funding",
    university_country: "UK",
    university_city: "Oxford",
    university_rank: "#3",
    subject_category: "Multi-disciplinary",
    degree: "Masters",
    tuition_fees: 0,
    application_fees: 0,
    service_charge: 0,
    application_deadline: "2026-11-05",
    official_link: "https://www.chevening.org/"
  },
  {
    id: "699aac16c163d4151702bcfd",
    university_name: "Tsinghua University",
    university_logo: "https://upload.wikimedia.org/wikipedia/en/thumb/0/08/CSC_Logo.png/250px-CSC_Logo.png",
    scholarship_category: "Full Funding",
    university_country: "China",
    university_city: "Beijing",
    university_rank: "#14",
    subject_category: "Multi-disciplinary",
    degree: "Masters",
    tuition_fees: 0,
    application_fees: 0,
    service_charge: 0,
    application_deadline: "2026-12-30",
    official_link: "https://www.campuschina.org/"
  }
];

const fixByIds = async () => {
  try {
    console.log("🔧 Fixing scholarship data by IDs...\n");

    // Get all existing scholarships
    const res = await axios.get(`${API_BASE_URL}/top-scholarships`);
    const existing = res.data || [];

    console.log(`Found ${existing.length} scholarships\n`);

    for (const scholarship of completeScholarships) {
      // Find by checking if description matches (since we don't have exact IDs)
      const existingOne = existing.find(
        (s) => s.scholarship_description && 
        s.scholarship_description.includes("Bourse") &&
        (s.scholarship_description.includes(scholarship.university_name.split(" ")[0]) ||
         scholarship.university_name.includes("ETH"))
      );

      if (existingOne) {
        const todayDate = new Date().toISOString().split("T")[0];
        
        const updateData = {
          university_name: scholarship.university_name,
          university_logo: scholarship.university_logo,
          scholarship_category: scholarship.scholarship_category,
          university_location: {
            country: scholarship.university_country,
            city: scholarship.university_city,
          },
          application_deadline: scholarship.application_deadline,
          subject_name: scholarship.subject_category,
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
          await axios.put(
            `${API_BASE_URL}/update-scholarships/${existingOne._id}`,
            updateData
          );
          console.log(`✅ Fixed: ${scholarship.university_name}`);
        } catch (error) {
          console.log(`❌ Error fixing ${scholarship.university_name}:`, error.message);
        }
      } else {
        console.log(`⚠️  Not found: ${scholarship.university_name}`);
      }
    }

    console.log("\n✨ Done!");
  } catch (error) {
    console.error("Error:", error.message);
  }
};

fixByIds();
