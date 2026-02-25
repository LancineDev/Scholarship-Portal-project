// Template for backend notification payloads

export const buildNotification = ({ title, body, link }) => ({
  title: title || "New Notification",
  body: body || "You have a new notification.",
  link: link || null,
  created_at: new Date().toISOString()
});
// FILE: routes/notifications.js (Backend Express.js Example)
// This is a TEMPLATE for implementing the backend API endpoints

import express from 'express';
import { ObjectId } from 'mongodb';

const router = express.Router();

// Middleware - You should add authentication
const verifyAuth = (req, res, next) => {
  // Verify JWT token or session
  // For now, just check if email is provided
  if (!req.query.email && !req.body.userEmail) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  next();
};

// ============ SUBSCRIPTIONS ROUTES ============

// GET all subscriptions (admin only)
router.get('/subscriptions', verifyAuth, async (req, res) => {
  try {
    const subscriptionsCollection = req.app.locals.db.collection('subscriptions');
    const subscriptions = await subscriptionsCollection.find({}).toArray();
    res.json(subscriptions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET subscriptions for a specific user
router.get('/subscriptions', verifyAuth, async (req, res) => {
  try {
    const { email } = req.query;
    
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const subscriptionsCollection = req.app.locals.db.collection('subscriptions');
    const subscriptions = await subscriptionsCollection
      .find({ userEmail: email })
      .toArray();

    res.json(subscriptions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET subscribers for a specific scholarship
router.get('/subscriptions/scholarship/:scholarshipId', async (req, res) => {
  try {
    const { scholarshipId } = req.params;
    const subscriptionsCollection = req.app.locals.db.collection('subscriptions');
    
    const subscriptions = await subscriptionsCollection
      .find({ scholarshipId })
      .toArray();

    res.json(subscriptions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST - Create a new subscription
router.post('/subscriptions', async (req, res) => {
  try {
    const {
      userEmail,
      scholarshipId,
      scholarshipName,
      subscribedDate,
      notificationPreferences
    } = req.body;

    if (!userEmail || !scholarshipId) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const subscriptionsCollection = req.app.locals.db.collection('subscriptions');

    // Check if already subscribed
    const existing = await subscriptionsCollection.findOne({
      userEmail,
      scholarshipId
    });

    if (existing) {
      return res.status(409).json({ message: 'Already subscribed to this scholarship' });
    }

    const subscription = {
      userEmail,
      scholarshipId,
      scholarshipName,
      subscribedDate: new Date(subscribedDate),
      notificationPreferences: {
        emailOnUpdate: notificationPreferences?.emailOnUpdate ?? true,
        emailOnDeadlineApproaching: notificationPreferences?.emailOnDeadlineApproaching ?? true,
        emailOnOpen: notificationPreferences?.emailOnOpen ?? true
      },
      createdAt: new Date()
    };

    const result = await subscriptionsCollection.insertOne(subscription);
    
    res.status(200).json({
      _id: result.insertedId,
      ...subscription
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE - Unsubscribe from a scholarship
router.delete('/subscriptions/:scholarshipId', async (req, res) => {
  try {
    const { scholarshipId } = req.params;
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const subscriptionsCollection = req.app.locals.db.collection('subscriptions');
    
    const result = await subscriptionsCollection.deleteOne({
      userEmail: email,
      scholarshipId
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Subscription not found' });
    }

    res.status(200).json({ message: 'Unsubscribed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PATCH - Update notification preferences
router.patch('/subscriptions/:scholarshipId', async (req, res) => {
  try {
    const { scholarshipId } = req.params;
    const { email } = req.query;
    const { notificationPreferences } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const subscriptionsCollection = req.app.locals.db.collection('subscriptions');
    
    const result = await subscriptionsCollection.updateOne(
      { userEmail: email, scholarshipId },
      { $set: { notificationPreferences } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Subscription not found' });
    }

    res.status(200).json({ message: 'Preferences updated' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ============ NOTIFICATIONS ROUTES ============

// GET notifications for a user
router.get('/notifications', async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const notificationsCollection = req.app.locals.db.collection('notifications');
    
    const notifications = await notificationsCollection
      .find({ userEmail: email })
      .sort({ createdAt: -1 })
      .toArray();

    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET a specific notification
router.get('/notifications/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const notificationsCollection = req.app.locals.db.collection('notifications');
    
    const notification = await notificationsCollection.findOne({
      _id: new ObjectId(id)
    });

    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    res.json(notification);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST - Create a new notification
router.post('/notifications', async (req, res) => {
  try {
    const {
      userEmail,
      scholarshipName,
      notificationType,
      scholarshipId,
      daysLeft,
      deadline,
      read
    } = req.body;

    if (!userEmail || !scholarshipId) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const notificationsCollection = req.app.locals.db.collection('notifications');

    const notification = {
      userEmail,
      scholarshipName,
      notificationType,
      scholarshipId,
      daysLeft: daysLeft || null,
      deadline: deadline || null,
      read: read || false,
      createdAt: new Date()
    };

    const result = await notificationsCollection.insertOne(notification);

    res.status(200).json({
      _id: result.insertedId,
      ...notification
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PATCH - Mark notification as read
router.patch('/notifications/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { read } = req.body;

    const notificationsCollection = req.app.locals.db.collection('notifications');
    
    const result = await notificationsCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { read: read ?? true } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    res.status(200).json({ message: 'Notification updated' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE - Clear all notifications for a user
router.delete('/notifications', async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const notificationsCollection = req.app.locals.db.collection('notifications');
    
    const result = await notificationsCollection.deleteMany({
      userEmail: email
    });

    res.status(200).json({
      message: 'Notifications cleared',
      deletedCount: result.deletedCount
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;

// ============ USAGE IN SERVER.JS ============
// import notificationRoutes from './routes/notifications.js';
// app.use(notificationRoutes);
