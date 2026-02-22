import axios from "axios";

const API_BASE_URL = "https://scholarship-portalbd-server.vercel.app";
const ADMIN_EMAIL = "portal@gmail.com";

const completeScholarships = [
  {
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
    official_link: "https://a2ascholarships.iccr.gov.in/",
    description_key: "University of Delhi"
  },
  {
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
    official_link: "https://www.turkiyeburslari.gov.tr/",
    description_key: "Middle East Technical University"
  },
  {
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
    official_link: "https://hea.ie/policy/internationalisation/goi-ies/",
    description_key: "Trinity College Dublin"
  },
  {
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
    official_link: "https://www.bristol.ac.uk/international/fees-finance/scholarships/",
    description_key: "University of Bristol"
  },
  {
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
    official_link: "https://study-uk.britishcouncil.org/scholarships-funding/great-scholarships",
    description_key: "British Council Partner Universities"
  },
  {
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
    official_link: "https://www.adb.org/work-with-us/careers/japan-scholarship-program",
    description_key: "University of Tokyo"
  },
  {
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
    official_link: "https://www.campusfrance.org/fr/le-programme-de-bourses-eiffel",
    description_key: "Sorbonne University"
  },
  {
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
    official_link: "https://www.sbfi.admin.ch/bourses-suisse",
    description_key: "ETH Zurich"
  },
  {
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
    official_link: "https://foreign.fulbrightonline.org/",
    description_key: "Harvard University"
  },
  {
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
    official_link: "https://www.chevening.org/",
    description_key: "University of Oxford"
  },
  {
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
    official_link: "https://www.campuschina.org/",
    description_key: "Tsinghua University"
  }
];

const descriptions = {
  "University of Delhi": "Bourse complète du gouvernement indien couvrant 100% des frais de scolarité, hébergement, allocation mensuelle (jusqu'à 500$/mois), billet d'avion international et assurance santé. Ouverte aux étudiants des pays partenaires de l'India Council for Cultural Relations (ICCR). Programme soutenu par le ministère des Affaires extérieures de l'Inde. Les bourses couvrent également une formation linguistique en hindi de 6 mois avant le début des études. Plus de 100 universités indiennes participantes. Cursus disponibles : Bachelor, Master et Doctorat. Sélection basée sur le mérite académique et les résultats aux tests standardisés.",
  "Middle East Technical University": "Bourse gouvernementale turque offrant un financement complet incluant : exonération totale des frais de scolarité, allocation mensuelle (200-400 TRY selon le niveau), une année de cours gratuits de langue turque, hébergement universitaire, assurance santé complète, frais de transport et argent de poche. Programme prestigieux financé par le gouvernement de la République de Türkiye. Ouvert à tous les citoyens étrangers. Plus de 200 universités partenaires à Ankara, Istanbul, Izmir et autres villes. Compétition internationale très élevée. Offre Bachelor, Master et Doctorat.",
  "Trinity College Dublin": "Bourse gouvernementale irlandaise offrant 10 000€ d'allocation annuelle et exonération complète des frais académiques pour les Master's et Doctorat. Programme soutenu par le gouvernement irlandais et administré par les institutions d'enseignement supérieur (HEA). Université classée Top 100 mondiale. Couvre tous les frais de scolarité plus allocation de subsistance. Disponible pour les étudiants de plus de 120 pays. Sélection très sélective basée sur l'excellence académique, la langue anglaise et le potentiel de recherche. Opportunités de networking avec des leaders internationaux.",
  "University of Bristol": "Bourse Think Big de l'Université de Bristol offrant une réduction significative des frais de scolarité (6 500 à 26 000 GBP selon le programme). Université classée Top 60 mondiale et Top 10 au Royaume-Uni. Programme pour les étudiants internationaux brillants. Disponible pour Bachelor et Master. Sélection basée sur le mérite académique et les résultats aux examens. Université renommée pour la recherche et l'innovation. Vie étudiante dynamique avec plus de 300 sociétés étudiantes. Réseau d'anciens élèves puissant dans les secteurs clés.",
  "British Council Partner Universities": "Bourse GREAT du British Council offrant une allocation minimum de £10,000 pour les études au Royaume-Uni. Programme en partenariat avec le gouvernement britannique. Disponible auprès de centaines d'universités partenaires à travers le Royaume-Uni. Combinable avec d'autres bourses pour un financement accru. Université classée dans le Top 100 mondial. Soutien académique et conseils de carrière inclus. Accès au réseau British Council pour le réseautage professionnel. Bachelor et Master disponibles.",
  "University of Tokyo": "Bourse ADB-JSP (Asian Development Bank Japan Scholarship Program) pour les citoyens des pays membres de l'ADB. Financement complet incluant : frais de scolarité, allocation mensuelle (144 000 JPY/mois = environ 960 USD), assurance santé, préparation linguistique en japonais (1 an gratuit), frais administratifs et retour au pays d'origine. Université classée Top 30 mondiale. Programme Master's uniquement. Sélection rigoureuse basée sur dossier académique, langue anglaise, entretien. Excellente préparation pour carrière internationale ou gouvernementale.",
  "Sorbonne University": "Bourse d'Excellence Eiffel du gouvernement français. Financement complet offrant environ 1 200€/mois pour les Master's et 1 800€/mois pour le Doctorat. Couverture des frais de scolarité. Programme prestigieux du ministère français des Affaires étrangères. Universités partenaires de haut prestige : Sorbonne, HEC, INSEAD, ESC, Polytechnique. Ouvert à tous les pays. Sélection extrêmement sélective (moins de 5% d'acceptation). Opportunité rare pour étudier en France dans des institutions d'excellence. Placement professionnel pratiquement garanti après graduation.",
  "ETH Zurich": "Bourse d'Excellence du gouvernement suisse pour chercheurs en Doctorat et post-doctorat. Financement complet incluant : frais de scolarité, allocation mensuelle généreuse (3 000-4 000 CHF), assurance santé, frais de recherche. ETH Zurich classée Top 10 mondiale et leader européenne en science et technologie. Université connue pour l'innovation et la recherche de pointe. Environnement international avec 40% d'étudiants étrangers. Accès à équipements scientifiques de classe mondiale. Partenariat possible avec industrie suisse de premier plan.",
  "Harvard University": "Fulbright Scholarship USA - Programme d'échange le plus prestigieux des États-Unis. Financement complet couvrant frais de scolarité, allocation mensuelle, assurance santé, frais administratifs. Harvard classée #1 ou #2 mundiale selon les classements. Programme Master's et Doctorat. Très sélectif avec moins de 10% de taux d'acceptation global. Accès à des professeurs de renommée mondiale et à des ressources académiques incomparables. Réseau Fulbright dans 160 pays. Placement professionnel pratiquement garanti. Transformation majeure de carrière.",
  "University of Oxford": "Chevening Scholarship - Bourse complète du gouvernement britannique pour les futurs leaders. Financement complet : frais de scolarité, allocation mensuelle (£834), assurances, frais administratifs. Université Oxford classée #3 mondiale et leader européenne depuis 900 ans. Master's uniquement. Exigence : minimum 2 ans d'expérience professionnelle. Très sélectif (5-10% acceptation). Programme de leadership inclus avec mentorat de leaders internationaux. Réseau Chevening de 50 000+ anciens élèves. Accès à prestigieux clubs et événements universitaires. Opportunité rare d'étudier dans une institution historique d'excellence.",
  "Tsinghua University": "China Scholarship Council (CSC) Bilateral Program. Financement complet du gouvernement chinois incluant : frais de scolarité entièrement exonérés, allocation mensuelle (2 500 CNY = ~350 USD/mois pour Master), logement gratuit, assurance santé. Tsinghua classée Top 15 mondiale et leader asiatique en technologie et innovation. Cursus Bachelor, Master et Doctorat disponibles. Processus candidature souvent via ambassade ou ministère local du pays d'origine. Support complet pour visa d'étudiant. Occasion unique d'étudier en Chine et développer réseau professionnel asiatique. Carrière très prometteuse en technologie et secteur public."
};

const fixScholarships = async () => {
  try {
    console.log("🔧 Fixing corrupted scholarship data...\n");

    // Get all existing scholarships
    const res = await axios.get(`${API_BASE_URL}/top-scholarships`);
    const existing = res.data || [];

    console.log(`Found ${existing.length} scholarships to fix\n`);

    for (const scholarship of completeScholarships) {
      // Find matching scholarship by description key
      const existing_scholarship = existing.find(
        (s) => s.scholarship_description && 
        s.scholarship_description.includes(scholarship.description_key)
      );

      if (existing_scholarship) {
        // Update the scholarship with correct fields
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
          scholarship_description: descriptions[scholarship.description_key],
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
            `${API_BASE_URL}/update-scholarships/${existing_scholarship._id}`,
            updateData
          );
          console.log(`✅ Fixed: ${scholarship.university_name}`);
        } catch (error) {
          console.log(`❌ Error fixing ${scholarship.university_name}`);
        }
      }
    }

    console.log("\n✨ All scholarships fixed!");
  } catch (error) {
    console.error("Error:", error.message);
  }
};

fixScholarships();
