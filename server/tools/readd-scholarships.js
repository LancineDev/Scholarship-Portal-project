import axios from "axios";

const API_BASE_URL = "https://scholarship-portalbd-server.vercel.app";

const scholarships = [
  {
    scholarship_name: "Re-added Scholarship",
    university_name: "Re-Example University",
    university_logo: "https://example.com/re-logo.png",
    university_country: "Global",
    university_city: "Virtual",
    subject_category: "Arts",
    scholarship_category: "Full Funding",
    degree: "Undergraduate",
    tuition_fees: 0,
    application_deadline: "2026-06-01",
    scholarship_description: "Re-adding example scholarship.",
    official_link: "https://example.com/re",
    posted_user_email: "portal@gmail.com"
  }
];

const run = async () => {
  for (const s of scholarships) {
    try {
      await axios.post(`${API_BASE_URL}/scholarships`, s);
      console.log(`Added ${s.scholarship_name}`);
    } catch (err) {
      console.error(err.message);
    }
  }
};

run();
import axios from "axios";

const API_BASE_URL = "https://scholarship-portalbd-server.vercel.app";
const ADMIN_EMAIL = "portal@gmail.com";

const scholarships = [
  {
    scholarship_name: "ICCR A2A Scholarship Scheme 2026-2027",
    university_name: "University of Delhi",
    university_logo: "https://www.du.ac.in/uploads/du-logo.png",
    university_country: "India",
    university_city: "New Delhi",
    university_rank: "Top 400–450 QS",
    subject_category: "Multi-disciplinary",
    scholarship_category: "Full Funding",
    degree: "Bachelor",
    tuition_fees: 0,
    application_fees: 0,
    service_charge: 0,
    application_deadline: "2026-04-15",
    scholarship_description: "Fully funded Government of India scholarship covering 100% tuition fees, monthly stipend (up to $500), accommodation, and international airfare for bachelor's and master's students from partner countries. Offered through partner universities including University of Delhi, Delhi University, and other prestigious institutions. This scheme supports students from developing countries across Asia, Africa, and South America in pursuing degrees in engineering, science, humanities, and professional fields. Benefits include free 6-month language training course (Hindi or English) at partner universities. Apply through the official A2A Scholarship portal.",
    official_link: "https://a2ascholarships.iccr.gov.in/"
  },
  {
    scholarship_name: "Türkiye Scholarships",
    university_name: "Middle East Technical University",
    university_logo: "https://www.metu.edu.tr/system/files/logo.png",
    university_country: "Turkey",
    university_city: "Ankara",
    university_rank: "Top 500 QS",
    subject_category: "Multi-disciplinary",
    scholarship_category: "Full Funding",
    degree: "Masters",
    tuition_fees: 0,
    application_fees: 0,
    service_charge: 0,
    application_deadline: "2026-02-25",
    scholarship_description: "Türkiye (Turkey) government scholarship program offering full funding for international students including tuition fees, monthly stipend, accommodation, health insurance, and travel allowance. Available for bachelor's, master's, and PhD programs in all fields including engineering, medicine, business, and humanities. Host institutions include Middle East Technical University (METU), TOBB ETÜ, Bilkent University, and 200+ partner universities across Turkey. The scholarship covers all expenses for the entire duration of studies. Highly competitive and merit-based selection process. Ideal for high-achieving international students from all countries.",
    official_link: "https://www.turkiyeburslari.gov.tr/"
  },
  {
    scholarship_name: "Government of Ireland International Education Scholarship",
    university_name: "Trinity College Dublin",
    university_logo: "https://www.tcd.ie/brand/assets/images/logos/tcd-logo.png",
    university_country: "Ireland",
    university_city: "Dublin",
    university_rank: "Top 100 QS",
    subject_category: "Multi-disciplinary",
    scholarship_category: "Full Funding",
    degree: "Masters",
    tuition_fees: 0,
    application_fees: 0,
    service_charge: 0,
    application_deadline: "2026-03-12",
    scholarship_description: "Irish government scholarship offering full tuition coverage plus €10,000 annual stipend for international students pursuing bachelor's or master's degrees at Irish universities. Prestigious partner institutions include Trinity College Dublin, University College Dublin (UCD), University of Galway, and other leading Irish universities. Available for students from all countries with strong academic records. Covers all program fees and provides generous living allowance. Focus on promoting Ireland as a top study destination and fostering international academic partnerships. Highly selective admission based on academic merit and English language proficiency.",
    official_link: "https://hea.ie/policy/internationalisation/goi-ies/"
  },
  {
    scholarship_name: "Think Big Scholarship",
    university_name: "University of Bristol",
    university_logo: "https://upload.wikimedia.org/wikipedia/en/thumb/9/9e/University_of_Bristol_logo.png/1200px-University_of_Bristol_logo.png",
    university_country: "UK",
    university_city: "Bristol",
    university_rank: "Top 60 QS",
    subject_category: "Multi-disciplinary",
    scholarship_category: "Partial Funding",
    degree: "Bachelor",
    tuition_fees: 6500,
    application_fees: 0,
    service_charge: 0,
    application_deadline: "2026-05-30",
    scholarship_description: "University of Bristol scholarship program providing partial funding ranging from £6,500 to £26,000 for international students pursuing bachelor's and master's degrees. Covers tuition fees or living costs depending on financial need. Open to students from all countries demonstrating academic excellence and potential to contribute to the University community. Available across all faculties including engineering, science, business, and arts. Bristol's world-class research environment and UK degree recognition make this highly valuable. Application process includes academic assessment and personal statement. Bristol consistently ranked in top 60 globally and top 10 in UK universities.",
    official_link: "https://www.bristol.ac.uk/international/fees-finance/scholarships/"
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
    degree: "Masters",
    tuition_fees: 10000,
    application_fees: 0,
    service_charge: 0,
    application_deadline: "2026-04-30",
    scholarship_description: "British Council GREAT Scholarship program offering partial funding (minimum £10,000) for international students studying at partner UK universities. Supports bachelor's and master's students in various fields including engineering, business, law, and sciences. Available through the official British Council network across all UK regions. Combines with other UK scholarships for enhanced funding opportunities. Promotes UK education globally and fosters international student diversity. Selection based on academic merit, English language proficiency, and potential for success in UK higher education. Access to extensive British Council networking and career services.",
    official_link: "https://study-uk.britishcouncil.org/scholarships-funding/great-scholarships"
  }
];

const addScholarships = async () => {
  try {
    console.log("🚀 Re-adding scholarships with correct data...\n");

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

    console.log("\n✨ Done! All scholarships re-added");
  } catch (error) {
    console.error("Error:", error.message);
  }
};

addScholarships();
