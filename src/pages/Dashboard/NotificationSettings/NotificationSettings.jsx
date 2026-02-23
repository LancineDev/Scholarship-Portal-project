import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Title from "../../../components/Title";
import useAuth from "../../../hooks/useAuth";
import useNotifications from "../../../hooks/useNotifications";
import Swal from "sweetalert2";
import Loading from "../../../components/Loading";
import PrimaryButton from "../../../components/PrimaryButton";
import SecondaryButton from "../../../components/SecondaryButton";

const NotificationSettings = () => {
  const { user, loading: authLoading } = useAuth();
  const { 
    subscribedScholarships, 
    loading, 
    unsubscribeFromScholarship, 
    updateNotificationPreferences,
    fetchSubscribedScholarships 
  } = useNotifications(user?.email);

  const [preferences, setPreferences] = useState({});
  const [savingId, setSavingId] = useState(null);

  useEffect(() => {
    // Initialize preferences
    const prefs = {};
    subscribedScholarships.forEach(sub => {
      prefs[sub.scholarshipId] = sub.notificationPreferences || {
        emailOnUpdate: true,
        emailOnDeadlineApproaching: true,
        emailOnOpen: true,
      };
    });
    setPreferences(prefs);
  }, [subscribedScholarships]);

  const handleUnsubscribe = async (scholarshipId, scholarshipName) => {
    const result = await Swal.fire({
      title: "Êtes-vous sûr?",
      text: `Vous vous désabonnerez des notifications pour "${scholarshipName}"`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui, désabonner",
      cancelButtonText: "Annuler",
    });

    if (result.isConfirmed) {
      try {
        const success = await unsubscribeFromScholarship(scholarshipId);
        if (success) {
          Swal.fire("Succès!", "Vous êtes désabonné.", "success");
          await fetchSubscribedScholarships();
        }
      } catch (error) {
        Swal.fire("Erreur!", "Impossible de se désabonner.", "error");
      }
    }
  };

  const handlePreferenceChange = (scholarshipId, key) => {
    setPreferences({
      ...preferences,
      [scholarshipId]: {
        ...preferences[scholarshipId],
        [key]: !preferences[scholarshipId][key],
      },
    });
  };

  const handleSavePreferences = async (scholarshipId) => {
    setSavingId(scholarshipId);
    try {
      const success = await updateNotificationPreferences(
        scholarshipId,
        preferences[scholarshipId]
      );
      if (success) {
        Swal.fire("Succès!", "Préférences mises à jour.", "success");
      }
    } catch (error) {
      Swal.fire("Erreur!", "Impossible de mettre à jour les préférences.", "error");
    } finally {
      setSavingId(null);
    }
  };

  if (authLoading || loading) {
    return <Loading />;
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center text-gray-600">
          Veuillez vous connecter pour gérer vos notifications.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Helmet>
        <title>10bourse | Paramètres de Notifications</title>
      </Helmet>

      <div className="mb-8">
        <Title title="Paramètres de Notifications" />
        <p className="text-center text-gray-600 mt-2">
          Gérez vos abonnements aux bourses et vos préférences de notification
        </p>
      </div>

      {subscribedScholarships.length === 0 ? (
        <div className="bg-accent-50 rounded-lg p-8 text-center">
          <svg
            className="mx-auto h-16 w-16 text-gray-400 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Aucun abonnement
          </h3>
          <p className="text-gray-600 mb-6">
            Vous n'êtes actuellement abonné à aucune bourse. Recherchez des bourses
            et abonnez-vous pour recevoir des notifications.
          </p>
          <a href="/all-scholarship" className="text-primary-600 hover:text-primary-700 font-medium">
            Voir les bourses disponibles →
          </a>
        </div>
      ) : (
        <div className="grid gap-6">
          {subscribedScholarships.map((subscription) => (
            <div
              key={subscription.scholarshipId}
              className="bg-white rounded-lg shadow-md p-6 border border-gray-200"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {subscription.scholarshipName}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Abonné depuis:{" "}
                    {new Date(subscription.subscribedDate).toLocaleDateString("fr-FR")}
                  </p>
                </div>
                <button
                  onClick={() =>
                    handleUnsubscribe(
                      subscription.scholarshipId,
                      subscription.scholarshipName
                    )
                  }
                  className="text-red-600 hover:text-red-700 text-sm font-medium"
                >
                  Désabonner
                </button>
              </div>

              {/* Notification Preferences */}
              <div className="bg-gray-50 rounded-lg p-4 mt-4">
                <h4 className="font-semibold text-gray-900 mb-4">
                  Préférences de Notification
                </h4>
                <div className="space-y-3">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={
                        preferences[subscription.scholarshipId]?.emailOnUpdate ??
                        true
                      }
                      onChange={() =>
                        handlePreferenceChange(
                          subscription.scholarshipId,
                          "emailOnUpdate"
                        )
                      }
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="ml-3 text-gray-700">
                      Recevoir un email lors de mises à jour
                    </span>
                  </label>

                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={
                        preferences[subscription.scholarshipId]
                          ?.emailOnDeadlineApproaching ?? true
                      }
                      onChange={() =>
                        handlePreferenceChange(
                          subscription.scholarshipId,
                          "emailOnDeadlineApproaching"
                        )
                      }
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="ml-3 text-gray-700">
                      Alert proche de la date limite (7 jours avant)
                    </span>
                  </label>

                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={
                        preferences[subscription.scholarshipId]?.emailOnOpen ??
                        true
                      }
                      onChange={() =>
                        handlePreferenceChange(
                          subscription.scholarshipId,
                          "emailOnOpen"
                        )
                      }
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="ml-3 text-gray-700">
                      Notification quand les candidatures ouvrent
                    </span>
                  </label>
                </div>

                <button
                  onClick={() => handleSavePreferences(subscription.scholarshipId)}
                  disabled={savingId === subscription.scholarshipId}
                  className="mt-4 bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  {savingId === subscription.scholarshipId
                    ? "Enregistrement..."
                    : "Enregistrer les préférences"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationSettings;
