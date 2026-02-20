// C:\Users\Keita\Scholarship-Portal-project\src\pages\AssistanceService.jsx

import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Title from "../components/Title";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../components/PrimaryButton";

const AssistanceService = () => {

  const universityName = "Professional Help Assistance";
  const scholarshipCategory = "Document Assistance";
  const subjectCategory = "CV / Motivation / Recommendation";
  const applicationFees = 0;
  const serviceCharge = 50;
  const total = applicationFees + serviceCharge;

  const [paymentMethod, setPaymentMethod] = useState("card");
  const navigate = useNavigate();


  const query = new URLSearchParams({
    applicationFees: String(applicationFees),
    serviceCharge: String(serviceCharge),
    universityName,
    scholarshipCategory,
    subjectCategory,
    paymentMethod,
  }).toString();

  // Convert USD to XOF (example rate: 1 USD ≈ 600 XOF)
  const xofTotal = total * 600;

  const handlePay = (e) => {
    e.preventDefault();
    if (paymentMethod === "orange") {
      window.open("tel:*144#", "_self");
      setTimeout(() => navigate(`/payment-assistance?${query}`), 1000);
    } else if (paymentMethod === "wave") {
      window.open("https://www.wave.com/sn/", "_blank");
      setTimeout(() => navigate(`/payment-assistance?${query}`), 1000);
    } else {
      navigate(`/payment-assistance?${query}`);
    }
  };

  return (
    <div className="container mx-auto my-16 px-4">
      <Helmet>
        <title>Scholarship Portal | Assistance</title>
      </Helmet>

      <Title title="Professional Assistance" />

      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
        <div className="md:col-span-2">
          <h3 className="text-xl font-semibold mb-3">What We Offer</h3>
          <p className="text-gray-700 mb-4">
            We provide professional assistance to help you succeed in your scholarship applications. Our services focus on:
          </p>
          <ul className="list-disc pl-6 text-gray-700 mb-4">
            <li><strong>CV preparation</strong> – Craft a strong, clear, and professional resume.</li>
            <li><strong>Motivation Letter writing</strong> – Communicate your goals and passion effectively.</li>
            <li><strong>Recommendation Letter guidance</strong> – Ensure your referees present you in the best light.</li>
            <li><strong>Study Plan support</strong> – Plan your academic path convincingly.</li>
          </ul>
          <p className="font-semibold mb-2">What You Get:</p>
          <ul className="space-y-2 text-gray-600 mb-6">
            <li>• Personalized document review</li>
            <li>• One-on-one feedback</li>
            <li>• Quick turnaround</li>
          </ul>
          <p className="text-sm text-gray-500">
            You are confirming your purchase of <strong>{universityName}</strong> under the category <strong>{scholarshipCategory}</strong>, covering CV, Motivation Letter, Recommendation Letter, and Study Plan.
          </p>
        </div>

        <aside className="bg-accent-50 border border-primary-200 p-4 rounded-md md:col-span-1">
          <div className="text-center mb-4">
            <p className="text-3xl font-extrabold">${total}</p>
            <p className="text-sm text-gray-500">Total price</p>
          </div>

          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Application Fees</span>
              <span>${applicationFees}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600 mt-2">
              <span>Service Charge</span>
              <span>${serviceCharge}</span>
            </div>
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-semibold text-gray-700">Choose payment method:</label>
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={paymentMethod === "card"}
                  onChange={() => setPaymentMethod("card")}
                />
                <span>Card (Visa/Mastercard)</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="orange"
                  checked={paymentMethod === "orange"}
                  onChange={() => setPaymentMethod("orange")}
                />
                <span>Orange Money</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="wave"
                  checked={paymentMethod === "wave"}
                  onChange={() => setPaymentMethod("wave")}
                />
                <span>Wave</span>
              </label>
            </div>
          </div>


          <form onSubmit={handlePay}>
            <PrimaryButton type="submit">
              Pay {xofTotal.toLocaleString()} XOF
            </PrimaryButton>
          </form>

          <div className="mt-4 text-xs text-gray-500">
            <p>Contacts: 0712129409 / 0710758249</p>
            <p>Email: klancine011@mail.com</p>
          </div>
        </aside>
      </div>

     
    </div>
  );
};

export default AssistanceService;