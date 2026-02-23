import { useState, useEffect } from "react";
import useAxiosPublic from "./useAxiosPublic";

const useNotifications = (userEmail) => {
  const axiosPublic = useAxiosPublic();
  const [notifications, setNotifications] = useState([]);
  const [subscribedScholarships, setSubscribedScholarships] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch user notifications
  // Generic fetch with retries and backoff for transient network errors
  const fetchWithRetry = async (fn, retries = 2, backoff = 500) => {
    let lastErr;
    for (let i = 0; i <= retries; i++) {
      try {
        return await fn();
      } catch (err) {
        lastErr = err;
        // Don't retry for 4xx errors
        if (err.response && err.response.status >= 400 && err.response.status < 500) break;
        // Wait before retrying
        await new Promise((r) => setTimeout(r, backoff * (i + 1)));
      }
    }
    throw lastErr;
  };

  const fetchNotifications = async () => {
    if (!userEmail) return;

    try {
      setLoading(true);
      const response = await fetchWithRetry(() => axiosPublic.get(`/notifications?email=${userEmail}`), 2, 700);
      setNotifications(response.data || []);
    } catch (error) {
      console.error("Error fetching notifications:", error.message || error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch subscribed scholarships
  const fetchSubscribedScholarships = async () => {
    if (!userEmail) return;
    try {
      const response = await fetchWithRetry(() => axiosPublic.get(`/subscriptions?email=${userEmail}`), 2, 700);
      setSubscribedScholarships(response.data || []);
    } catch (error) {
      console.error("Error fetching subscriptions:", error.message || error);
    }
  };

  // Subscribe to a scholarship
  const subscribeToScholarship = async (scholarshipId, scholarshipName) => {
    if (!userEmail) return false;
    
    try {
      const subscription = {
        userEmail,
        scholarshipId,
        scholarshipName,
        subscribedDate: new Date().toISOString(),
        notificationPreferences: {
          emailOnUpdate: true,
          emailOnDeadlineApproaching: true,
          emailOnOpen: true,
        },
      };

      const response = await axiosPublic.post("/subscriptions", subscription);
      
      if (response.status === 200) {
        // Add to local state
        setSubscribedScholarships([
          ...subscribedScholarships,
          { ...subscription, _id: response.data._id },
        ]);
        return true;
      }
    } catch (error) {
      console.error("Error subscribing to scholarship:", error);
    }
    return false;
  };

  // Unsubscribe from a scholarship
  const unsubscribeFromScholarship = async (scholarshipId) => {
    if (!userEmail) return false;
    
    try {
      const response = await axiosPublic.delete(
        `/subscriptions/${scholarshipId}?email=${userEmail}`
      );

      if (response.status === 200) {
        // Remove from local state
        setSubscribedScholarships(
          subscribedScholarships.filter(sub => sub.scholarshipId !== scholarshipId)
        );
        return true;
      }
    } catch (error) {
      console.error("Error unsubscribing from scholarship:", error);
    }
    return false;
  };

  // Update notification preferences
  const updateNotificationPreferences = async (scholarshipId, preferences) => {
    if (!userEmail) return false;
    
    try {
      const response = await axiosPublic.patch(
        `/subscriptions/${scholarshipId}?email=${userEmail}`,
        { notificationPreferences: preferences }
      );

      if (response.status === 200) {
        // Update local state
        setSubscribedScholarships(
          subscribedScholarships.map(sub =>
            sub.scholarshipId === scholarshipId
              ? { ...sub, notificationPreferences: preferences }
              : sub
          )
        );
        return true;
      }
    } catch (error) {
      console.error("Error updating preferences:", error);
    }
    return false;
  };

  // Check if scholarship is subscribed
  const isSubscribed = (scholarshipId) => {
    return subscribedScholarships.some(sub => sub.scholarshipId === scholarshipId);
  };

  // Mark notification as read
  const markAsRead = async (notificationId) => {
    try {
      await axiosPublic.patch(`/notifications/${notificationId}`, { read: true });
      setNotifications(
        notifications.map(notif =>
          notif._id === notificationId ? { ...notif, read: true } : notif
        )
      );
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  // Clear all notifications
  const clearNotifications = async () => {
    if (!userEmail) return false;
    
    try {
      const response = await axiosPublic.delete(
        `/notifications?email=${userEmail}`
      );
      
      if (response.status === 200) {
        setNotifications([]);
        return true;
      }
    } catch (error) {
      console.error("Error clearing notifications:", error);
    }
    return false;
  };

  // Fetch data when email changes
  useEffect(() => {
    if (userEmail) {
      fetchNotifications();
      fetchSubscribedScholarships();
    }
  }, [userEmail]);

  return {
    notifications,
    subscribedScholarships,
    loading,
    subscribeToScholarship,
    unsubscribeFromScholarship,
    updateNotificationPreferences,
    isSubscribed,
    markAsRead,
    clearNotifications,
    fetchNotifications,
    fetchSubscribedScholarships,
  };
};

export default useNotifications;
