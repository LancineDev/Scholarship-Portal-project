// Template for backend notification payloads

export const buildNotification = ({ title, body, link }) => ({
  title: title || "New Notification",
  body: body || "You have a new notification.",
  link: link || null,
  created_at: new Date().toISOString()
});
