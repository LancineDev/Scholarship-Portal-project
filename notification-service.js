import axios from "axios";

const API_BASE_URL = "https://scholarship-portalbd-server.vercel.app";
const ADMIN_EMAIL = "portal@gmail.com";

// Script to send notification emails for upcoming deadlines
const sendDeadlineNotifications = async () => {
  try {
    console.log("🔔 Starting deadline notification service...\n");

    // Get all subscriptions from backend
    const subscriptionsResponse = await axios.get(
      `${API_BASE_URL}/subscriptions`
    );
    const subscriptions = subscriptionsResponse.data || [];

    console.log(`Found ${subscriptions.length} subscriptions\n`);

    const today = new Date();
    const sevenDaysFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

    let notificationsSent = 0;

    for (const subscription of subscriptions) {
      try {
        // Get scholarship details
        const scholarshipResponse = await axios.get(
          `${API_BASE_URL}/top-scholarships/${subscription.scholarshipId}`
        );
        const scholarship = scholarshipResponse.data;

        if (!scholarship) {
          console.log(`⚠️  Scholarship not found: ${subscription.scholarshipId}`);
          continue;
        }

        const deadline = new Date(scholarship.application_deadline);

        // Check if deadline is approaching (within 7 days) and user wants notifications
        if (
          deadline <= sevenDaysFromNow &&
          deadline > today &&
          subscription.notificationPreferences?.emailOnDeadlineApproaching
        ) {
          const daysLeft = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));

          // Send notification email
          const notification = {
            userEmail: subscription.userEmail,
            scholarshipName: subscription.scholarshipName,
            daysLeft,
            deadline: deadline.toLocaleDateString("fr-FR"),
            scholarshipId: subscription.scholarshipId,
            notificationType: "deadline-approaching",
            read: false,
            createdAt: new Date().toISOString(),
          };

          const notificationResponse = await axios.post(
            `${API_BASE_URL}/notifications`,
            notification
          );

          if (notificationResponse.status === 200) {
            console.log(
              `✅ Notification sent: ${subscription.scholarshipName} (${daysLeft} days left) to ${subscription.userEmail}`
            );
            notificationsSent++;
          }
        }
      } catch (error) {
        console.error(
          `❌ Error processing subscription ${subscription._id}:`,
          error.message
        );
      }
    }

    console.log(
      `\n✨ Notification service completed! ${notificationsSent} notifications sent.`
    );
  } catch (error) {
    console.error("Error:", error.message);
  }
};

// Script to send notification for new scholarship openings
const sendNewScholarshipNotifications = async (newScholarshipId) => {
  try {
    console.log(
      `🎓 Sending notifications for new scholarship: ${newScholarshipId}\n`
    );

    // Get all users
    const usersResponse = await axios.get(`${API_BASE_URL}/users`);
    const users = usersResponse.data || [];

    console.log(`Notifying ${users.length} users\n`);

    // Get scholarship details
    const scholarshipResponse = await axios.get(
      `${API_BASE_URL}/top-scholarships/${newScholarshipId}`
    );
    const scholarship = scholarshipResponse.data;

    let notificationsSent = 0;

    for (const user of users) {
      try {
        const notification = {
          userEmail: user.email,
          scholarshipName: scholarship.university_name,
          subject: scholarship.subject_name,
          notificationType: "new-scholarship",
          scholarshipId: newScholarshipId,
          read: false,
          createdAt: new Date().toISOString(),
        };

        const response = await axios.post(
          `${API_BASE_URL}/notifications`,
          notification
        );

        if (response.status === 200) {
          console.log(`✅ New scholarship notification sent to ${user.email}`);
          notificationsSent++;
        }
      } catch (error) {
        console.error(
          `❌ Error sending notification to ${user.email}:`,
          error.message
        );
      }
    }

    console.log(
      `\n✨ New scholarship notifications completed! ${notificationsSent} notifications sent.`
    );
  } catch (error) {
    console.error("Error:", error.message);
  }
};

// Script to send reminders for subscribed scholarships with updates
const sendSubscriptionUpdateNotifications = async (scholarshipId) => {
  try {
    console.log(`📢 Sending update notifications for scholarship: ${scholarshipId}\n`);

    // Get all subscriptions for this scholarship
    const subscriptionsResponse = await axios.get(
      `${API_BASE_URL}/subscriptions/scholarship/${scholarshipId}`
    );
    const subscriptions = subscriptionsResponse.data || [];

    console.log(`Found ${subscriptions.length} subscribers\n`);

    // Get scholarship details
    const scholarshipResponse = await axios.get(
      `${API_BASE_URL}/top-scholarships/${scholarshipId}`
    );
    const scholarship = scholarshipResponse.data;

    let notificationsSent = 0;

    for (const subscription of subscriptions) {
      if (subscription.notificationPreferences?.emailOnUpdate) {
        try {
          const notification = {
            userEmail: subscription.userEmail,
            scholarshipName: subscription.scholarshipName,
            notificationType: "scholarship-updated",
            scholarshipId,
            read: false,
            createdAt: new Date().toISOString(),
          };

          const response = await axios.post(
            `${API_BASE_URL}/notifications`,
            notification
          );

          if (response.status === 200) {
            console.log(
              `✅ Update notification sent to ${subscription.userEmail}`
            );
            notificationsSent++;
          }
        } catch (error) {
          console.error(
            `❌ Error sending notification to ${subscription.userEmail}:`,
            error.message
          );
        }
      }
    }

    console.log(
      `\n✨ Update notifications completed! ${notificationsSent} notifications sent.`
    );
  } catch (error) {
    console.error("Error:", error.message);
  }
};

// Run deadline notifications every day at 9 AM
const scheduleDeadlineNotifications = () => {
  console.log("📅 Scheduling daily deadline notifications...");

  // For testing, run immediately
  // sendDeadlineNotifications();

  // Run every 24 hours
  setInterval(() => {
    const now = new Date();
    if (now.getHours() === 9 && now.getMinutes() === 0) {
      sendDeadlineNotifications();
    }
  }, 60000); // Check every minute
};

export {
  sendDeadlineNotifications,
  sendNewScholarshipNotifications,
  sendSubscriptionUpdateNotifications,
  scheduleDeadlineNotifications,
};
