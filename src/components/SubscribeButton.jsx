import PropTypes from "prop-types";
import { useState } from "react";
import useAuth from "../hooks/useAuth";
import useNotifications from "../hooks/useNotifications";
import Swal from "sweetalert2";

const SubscribeButton = ({ scholarshipId, scholarshipName }) => {
  const { user } = useAuth();
  const { isSubscribed, subscribeToScholarship, unsubscribeFromScholarship } =
    useNotifications(user?.email);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async () => {
    if (!user) {
      Swal.fire({
        icon: "info",
        title: "Connexion requise",
        text: "Veuillez vous connecter pour vous abonner aux notifications.",
        confirmButtonText: "Aller à la connexion",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "/login";
        }
      });
      return;
    }

    setIsLoading(true);
    try {
      const success = await subscribeToScholarship(scholarshipId, scholarshipName);
      if (success) {
        Swal.fire({
          icon: "success",
          title: "Abonné!",
          text: "Vous recevrez des notifications pour cette bourse.",
          timer: 2000,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Erreur",
          text: "Impossible de s'abonner. Veuillez réessayer.",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: "Une erreur est survenue.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnsubscribe = async () => {
    setIsLoading(true);
    try {
      const success = await unsubscribeFromScholarship(scholarshipId);
      if (success) {
        Swal.fire({
          icon: "success",
          title: "Désabonné!",
          text: "Vous ne recevrez plus de notifications pour cette bourse.",
          timer: 2000,
        });
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const subscribed = isSubscribed(scholarshipId);

  return (
    <button
      onClick={subscribed ? handleUnsubscribe : handleSubscribe}
      disabled={isLoading}
      className={`px-6 py-2 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2 ${
        subscribed
          ? "bg-red-500 text-white hover:bg-red-600"
          : "bg-primary-600 text-white hover:bg-primary-700"
      } disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      <svg
        className="w-5 h-5"
        fill={subscribed ? "currentColor" : "none"}
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 17h5l-1.405-1.405A2.032 2.032 0 0018 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
        />
      </svg>
      {isLoading ? (
        "Chargement..."
      ) : subscribed ? (
        "Désabonner des notifications"
      ) : (
        "S'abonner aux notifications"
      )}
    </button>
  );
};

SubscribeButton.propTypes = {
  scholarshipId: PropTypes.string.isRequired,
  scholarshipName: PropTypes.string.isRequired,
};

export default SubscribeButton;
