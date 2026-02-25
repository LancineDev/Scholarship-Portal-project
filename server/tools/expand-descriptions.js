import axios from "axios";

const API_BASE_URL = "https://scholarship-portalbd-server.vercel.app";

const run = async () => {
  try {
    const res = await axios.get(`${API_BASE_URL}/scholarships`);
    const items = res.data || [];

    for (const it of items) {
      if (it.scholarship_description && it.scholarship_description.length < 100) {
        try {
          await axios.put(`${API_BASE_URL}/scholarships/${it._id}`, {
            ...it,
            scholarship_description: it.scholarship_description + " - Description updated."
          });
          console.log(`Expanded ${it._id}`);
        } catch (e) {
          // ignore
        }
      }
    }

    console.log("Expand descriptions done");
  } catch (err) {
    console.error(err.message);
  }
};

run();
import axios from "axios";

const API_BASE_URL = "https://scholarship-portalbd-server.vercel.app";

const expandedDescriptions = {
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

const updateDescriptions = async () => {
  try {
    console.log("📝 Updating scholarship descriptions...\n");

    const res = await axios.get(`${API_BASE_URL}/top-scholarships`);
    const scholarships = res.data || [];

    let updated = 0;
    for (const scholarship of scholarships) {
      const newDesc = expandedDescriptions[scholarship.university_name];
      
      if (newDesc && newDesc !== scholarship.scholarship_description) {
        try {
          await axios.put(
            `${API_BASE_URL}/update-scholarships/${scholarship._id}`,
            { scholarship_description: newDesc }
          );
          console.log(`✅ Updated: ${scholarship.university_name}`);
          updated++;
        } catch (error) {
          console.log(`❌ Error updating ${scholarship.university_name}`);
        }
      }
    }

    console.log(`\n✨ Updated ${updated} descriptions!`);
  } catch (error) {
    console.error("Error:", error.message);
  }
};

updateDescriptions();
