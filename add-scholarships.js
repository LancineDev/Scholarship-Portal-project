import axios from "axios";

const API_BASE_URL = "https://scholarship-portalbd-server.vercel.app";
const ADMIN_EMAIL = "portal@gmail.com";

const scholarships = [
  {
    scholarship_name: "ICCR A2A Scholarship Scheme 2026-2027",
    university_name: "University of Delhi",
    university_logo: "/assets/logos/du.png",
    university_country: "India",
    university_city: "New Delhi",
    university_rank: "Top 400–450 QS",
    subject_category: "Multi-disciplinary",
    scholarship_category: "Full Funding",
    degree: "Bachelor, Masters, PhD",
    tuition_fees: 0,
    application_fees: 0,
    service_charge: 0,
    application_deadline: "2026-04-15",
    scholarship_description: "Fully funded Government of India scholarship covering tuition, monthly stipend, accommodation, and airfare. Official Website: https://a2ascholarships.iccr.gov.in/",
  },
  {
    scholarship_name: "Türkiye Scholarships",
    university_name: "Middle East Technical University",
    university_logo: "/assets/logos/metu.png",
    university_country: "Turkey",
    university_city: "Ankara",
    university_rank: "Top 500 QS",
    subject_category: "Multi-disciplinary",
    scholarship_category: "Full Funding",
    degree: "Bachelor, Masters, PhD",
    tuition_fees: 0,
    application_fees: 0,
    service_charge: 0,
    application_deadline: "2026-02-25",
    scholarship_description: "Fully funded Turkish government scholarship for international students. Official Website: https://www.turkiyeburslari.gov.tr/",
  },
  {
    scholarship_name: "Government of Ireland International Education Scholarship",
    university_name: "Trinity College Dublin",
    university_logo: "/assets/logos/tcd.png",
    university_country: "Ireland",
    university_city: "Dublin",
    university_rank: "Top 100 QS",
    subject_category: "Multi-disciplinary",
    scholarship_category: "Full Funding",
    degree: "Bachelor, Masters, PhD",
    tuition_fees: 10000,
    application_fees: 0,
    service_charge: 0,
    application_deadline: "2026-03-12",
    scholarship_description: "Full tuition and €10,000 stipend for international students. Official Website: https://hea.ie/policy/internationalisation/goi-ies/",
  },
  {
    scholarship_name: "Think Big Scholarship",
    university_name: "University of Bristol",
    university_logo: "https://upload.wikimedia.org/wikipedia/en/9/9e/University_of_Bristol_logo.png",
    university_country: "UK",
    university_city: "Bristol",
    university_rank: "Top 60 QS",
    subject_category: "Multi-disciplinary",
    scholarship_category: "Partial Funding",
    degree: "Bachelor, Masters",
    tuition_fees: 6500,
    application_fees: 0,
    service_charge: 0,
    application_deadline: "2026-05-30",
    scholarship_description: "Partial funding (£6,500–£26,000) for international students. Official Website: https://www.bristol.ac.uk/international/fees-finance/scholarships/",
  },
  {
    scholarship_name: "GREAT Scholarship",
    university_name: "British Council Partner Universities",
    university_logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/British_Council_logo.png",
    university_country: "UK",
    university_city: "London",
    university_rank: "Varies",
    subject_category: "Multi-disciplinary",
    scholarship_category: "Partial Funding",
    degree: "Bachelor, Masters",
    tuition_fees: 10000,
    application_fees: 0,
    service_charge: 0,
    application_deadline: "2026-04-30",
    scholarship_description: "Partial funding (£10,000 minimum) for international students. Official Website: https://study-uk.britishcouncil.org/scholarships-funding/great-scholarships",
  },
];

const addScholarships = async () => {
  try {
    console.log("🚀 Starting to add scholarships...\n");

    for (const scholarship of scholarships) {
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
      };

      try {
        const response = await axios.post(
          `${API_BASE_URL}/scholarships`,
          scholarshipData
        );

        if (response.status === 200) {
          console.log(`✅ Added: ${scholarship.scholarship_name}`);
        }
      } catch (error) {
        console.log(
          `❌ Error adding ${scholarship.scholarship_name}:`,
          error.response?.data || error.message
        );
      }
    }

    console.log("\n✨ All scholarships processing completed!");
  } catch (error) {
    console.error("Error:", error.message);
  }
};

addScholarships();
