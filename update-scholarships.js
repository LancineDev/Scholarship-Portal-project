import axios from "axios";

const API_BASE_URL = "https://scholarship-portalbd-server.vercel.app";

const scholarshipsUpdate = [
  {
    university: "University of Delhi",
    description: "Fully funded Government of India scholarship covering 100% tuition fees, monthly stipend (up to $500), accommodation, and international airfare for bachelor's and master's students from partner countries. Offered through partner universities including University of Delhi, Delhi University, and other prestigious institutions. This scheme supports students from developing countries across Asia, Africa, and South America in pursuing degrees in engineering, science, humanities, and professional fields. Benefits include free 6-month language training course (Hindi or English) at partner universities. Apply through the official A2A Scholarship portal.",
    official_link: "https://a2ascholarships.iccr.gov.in/"
  },
  {
    university: "Middle East Technical University",
    description: "Türkiye (Turkey) government scholarship program offering full funding for international students including tuition fees, monthly stipend, accommodation, health insurance, and travel allowance. Available for bachelor's, master's, and PhD programs in all fields including engineering, medicine, business, and humanities. Host institutions include Middle East Technical University (METU), TOBB ETÜ, Bilkent University, and 200+ partner universities across Turkey. The scholarship covers all expenses for the entire duration of studies. Highly competitive and merit-based selection process. Ideal for high-achieving international students from all countries.",
    official_link: "https://www.turkiyeburslari.gov.tr/"
  },
  {
    university: "Trinity College Dublin",
    description: "Irish government scholarship offering full tuition coverage plus €10,000 annual stipend for international students pursuing bachelor's or master's degrees at Irish universities. Prestigious partner institutions include Trinity College Dublin, University College Dublin (UCD), University of Galway, and other leading Irish universities. Available for students from all countries with strong academic records. Covers all program fees and provides generous living allowance. Focus on promoting Ireland as a top study destination and fostering international academic partnerships. Highly selective admission based on academic merit and English language proficiency.",
    official_link: "https://hea.ie/policy/internationalisation/goi-ies/"
  },
  {
    university: "University of Bristol",
    description: "University of Bristol scholarship program providing partial funding ranging from £6,500 to £26,000 for international students pursuing bachelor's and master's degrees. Covers tuition fees or living costs depending on financial need. Open to students from all countries demonstrating academic excellence and potential to contribute to the University community. Available across all faculties including engineering, science, business, and arts. Bristol's world-class research environment and UK degree recognition make this highly valuable. Application process includes academic assessment and personal statement. Bristol consistently ranked in top 60 globally and top 10 in UK universities.",
    official_link: "https://www.bristol.ac.uk/international/fees-finance/scholarships/"
  },
  {
    university: "British Council Partner Universities",
    description: "British Council GREAT Scholarship program offering partial funding (minimum £10,000) for international students studying at partner UK universities. Supports bachelor's and master's students in various fields including engineering, business, law, and sciences. Available through the official British Council network across all UK regions. Combines with other UK scholarships for enhanced funding opportunities. Promotes UK education globally and fosters international student diversity. Selection based on academic merit, English language proficiency, and potential for success in UK higher education. Access to extensive British Council networking and career services.",
    official_link: "https://study-uk.britishcouncil.org/scholarships-funding/great-scholarships"
  }
];

const updateScholarships = async () => {
  try {
    console.log("📝 Updating scholarship descriptions...\n");

    const response = await axios.get(`${API_BASE_URL}/top-scholarships`);
    const scholarships = response.data;

    for (const update of scholarshipsUpdate) {
      const scholarship = scholarships.find(s => s.university_name === update.university);
      
      if (scholarship) {
        try {
          const updateData = {
            scholarship_description: update.description,
            official_link: update.official_link
          };

          const updateResponse = await axios.put(
            `${API_BASE_URL}/update-scholarships/${scholarship._id}`,
            updateData
          );

          if (updateResponse.status === 200) {
            console.log(`✅ Updated: ${update.university}`);
          }
        } catch (error) {
          console.log(`❌ Error updating ${update.university}:`, error.response?.data?.message || error.message);
        }
      } else {
        console.log(`⚠️ Not found: ${update.university}`);
      }
    }

    console.log("\n✨ Scholarship updates completed!");
  } catch (error) {
    console.error("Error:", error.message);
  }
};

updateScholarships();
