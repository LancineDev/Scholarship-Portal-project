import PropTypes from "prop-types";
import { useState } from "react";
import PrimaryButton from "../../components/PrimaryButton";
import ScholarshipForm from "../ScholarshipForm/ScholarshipForm";

const AlternativePayment = ({ method, totalAmount, universityName, scholarshipCategory, subjectCategory, applicationFees, serviceCharge }) => {
  // Always show the application form for Orange Money or Wave (skip instructions)
  const [reference] = useState(`SP-${Math.floor(100000 + Math.random() * 900000)}`);
  const xofAmount = totalAmount * 600;

  if (method === "orange" || method === "wave") {
    return (
      <ScholarshipForm
        universityName={ universityName }
        scholarshipCategory={ scholarshipCategory }
        subjectCategory={ subjectCategory }
        applicationFees={ applicationFees }
        serviceCharge={ serviceCharge }
      />
    );
  }

  // Only show card payment instructions for card method
  const [paid, setPaid] = useState(false);
  const handleConfirm = () => {
    setPaid(true);
  };
  if (paid) {
    return (
      <ScholarshipForm
        universityName={ universityName }
        scholarshipCategory={ scholarshipCategory }
        subjectCategory={ subjectCategory }
        applicationFees={ applicationFees }
        serviceCharge={ serviceCharge }
      />
    );
  }

  return (
    <div className="max-w-xl mx-auto bg-white shadow p-6 rounded">
      <h3 className="text-2xl font-bold mb-4">Card Payment</h3>
      <p className="text-gray-700 mb-4">Follow the instructions below to complete the payment of <strong>{ xofAmount.toLocaleString() } XOF</strong>.</p>
      {/* ...existing code for card payment instructions if needed... */}
      <PrimaryButton onClick={ handleConfirm }>I have paid</PrimaryButton>
    </div>
  );
};

AlternativePayment.propTypes = {
  method: PropTypes.oneOf(["card", "orange", "wave"]),
  totalAmount: PropTypes.number,
  universityName: PropTypes.string,
  scholarshipCategory: PropTypes.string,
  subjectCategory: PropTypes.string,
  applicationFees: PropTypes.number,
  serviceCharge: PropTypes.number,
};

export default AlternativePayment;
