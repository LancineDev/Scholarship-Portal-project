// C:\Users\Keita\Scholarship-Portal-project\src\pages\AssistanceService.jsx

import { Helmet } from "react-helmet-async";

const AssistanceService = () => {
  // Ton lien WhatsApp avec ton numéro et le message pré-rempli
  const whatsappLink =
    "https://wa.me/2250712129409?text=Bonjour%20Scholarship%20Portal,%0A%0AJe%20suis%20int%C3%A9ress%C3%A9(e)%20par%20votre%20service%20d%27assistance%20professionnelle%20(9%20995%20F%20CFA).%0A%0AVoici%20mes%20informations%20:%0A- Nom%20complet%20:%0A- Pays%20:%0A- Nom%20de%20la%20bourse%20:%0A- Date%20limite%20:%0A%0AMerci%20de%20me%20guider%20pour%20la%20suite.";

  return (
    <>
      <Helmet>
        <title>Assistance Professionnelle | Scholarship Portal</title>
      </Helmet>

      <div className="container mx-auto my-16 px-4 text-center">
        <h1 className="text-3xl font-bold mb-6">
          Assistance Professionnelle
        </h1>

        <p className="mb-6 text-gray-700">
          Cliquez sur le bouton ci-dessous pour nous contacter directement sur WhatsApp.
          Le message sera automatiquement rempli avec les informations nécessaires.
        </p>

        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-green-700 transition"
        >
          Contacter sur WhatsApp
        </a>

        <p className="mt-6 text-gray-500 text-sm">
          Après nous avoir contactés, nous vous guiderons pour le paiement et la prestation.
        </p>
      </div>
    </>
  );
};

export default AssistanceService;