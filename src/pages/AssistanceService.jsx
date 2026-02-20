// C:\Users\Keita\Scholarship-Portal-project\src\pages\AssistanceService.jsx
import { Link } from "react-router-dom";
import AuthButton from "../../components/AuthButton";

const AssistanceService = () => {
  // Infos fixes pour l'assistance
  const universityName = "Professional Help Assistance";
  const scholarshipCategory = "Document Assistance";
  const subjectCategory = "CV / Motivation / Recommendation";
  const applicationFees = 0;
  const serviceCharge = 50;
  const total = applicationFees + serviceCharge;

  return (
    <div className="container mx-auto py-16 px-4 max-w-xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Scholarship Portal</h1>

      <p className="mb-4 text-center text-gray-700">
        You are confirming your purchase of <strong>{universityName}</strong> in the category of <strong>{scholarshipCategory}</strong> with a focus on <strong>{subjectCategory}</strong>.
      </p>

      <div className="border p-4 rounded-md mb-6 bg-gray-50">
        <div className="flex justify-between mb-2">
          <span className="text-gray-600">Application Fees</span>
          <span className="text-gray-800">${applicationFees}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-gray-600">Service Charge</span>
          <span className="text-gray-800">${serviceCharge}</span>
        </div>
        <div className="flex justify-between font-bold text-lg mt-2 pt-2 border-t border-gray-200">
          <span>Total</span>
          <span>${total}</span>
        </div>
      </div>

      {/* Bouton pour aller vers le paiement existant */}
      <Link
        to={`/payment-assistance?applicationFees=${applicationFees}&serviceCharge=${serviceCharge}`}
      >
        <AuthButton text={`Pay $${total}`} />
      </Link>

      <footer className="mt-12 text-center text-gray-500 text-sm">
        <p>Scholarship Portal is the most powerful next-gen scholarship platform for Côte d'Ivoire.</p>
        <p>Providing information about international financial aid & scholarships since 2024.</p>
        <p>Contacts: 0712129409 / 0710758249 | Email: klancine011@mail.com</p>
        <p>Address: Abidjan, Côte d'Ivoire</p>
        <p>© 2024 Scholarship Portal Inc. All rights reserved.</p>
        <div className="mt-2">
          <a href="/faq" className="mr-2 underline">FAQ</a>
          <a href="/privacy-policy" className="mr-2 underline">Privacy Policy</a>
          <a href="/terms" className="underline">Terms & Conditions</a>
        </div>
      </footer>
    </div>
  );
};

export default AssistanceService;