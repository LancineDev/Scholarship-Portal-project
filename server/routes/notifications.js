// routes/notifications.js
// Complete backend implementation for notifications system

import express from 'express';
import { ObjectId } from 'mongodb';

const router = express.Router();

// Middleware to verify user email (basic auth check)
const verifyUserEmail = (req, res, next) => {
  const email = req.query.email || req.body.userEmail;
  
  if (!email) {
    return res.status(400).json({ 
      success: false,
      message: 'Email is required' 
    });
  }
  
  req.userEmail = email;
  next();
};

// ============ SUBSCRIPTIONS ROUTES ============

/**
 * GET /subscriptions
 * Returns subscriptions for a user or all subscriptions (admin)
 * Query: ?email=user@example.com
 */
router.get('/subscriptions', verifyUserEmail, async (req, res) => {
  try {
    const db = req.app.locals.db;
    const subscriptionsCollection = db.collection('subscriptions');
    
    const subscriptions = await subscriptionsCollection
      .find({ userEmail: req.userEmail })
      .toArray();

    return res.status(200).json({
      success: true,
      data: subscriptions,
      count: subscriptions.length
    });
  } catch (error) {
    console.error('[GET /subscriptions] Error:', error.message);
    return res.status(500).json({ 
      success: false,
      message: 'Failed to fetch subscriptions',
      error: error.message 
    });
  }
});

/**
 * GET /subscriptions/scholarship/:scholarshipId
 * Get all subscribers for a specific scholarship (admin)
 */
router.get('/subscriptions/scholarship/:scholarshipId', async (req, res) => {
  try {
    const { scholarshipId } = req.params;
    
    if (!scholarshipId) {
      return res.status(400).json({ 
        success: false,
        message: 'Scholarship ID is required' 
      });
    }

    const db = req.app.locals.db;
    const subscriptionsCollection = db.collection('subscriptions');
    
    const subscriptions = await subscriptionsCollection
      .find({ scholarshipId })
      .toArray();

    return res.status(200).json({
      success: true,
      data: subscriptions,
      count: subscriptions.length
    });
  } catch (error) {
    console.error('[GET /subscriptions/scholarship/:id] Error:', error.message);
    return res.status(500).json({ 
      success: false,
      message: 'Failed to fetch scholarship subscribers',
      error: error.message 
    });
  }
});

/**
 * POST /subscriptions
 * Create a new subscription
 * Body: {
 *   userEmail, scholarshipId, scholarshipName, 
 *   subscribedDate, notificationPreferences
 * }
 */
router.post('/subscriptions', async (req, res) => {
  try {
    const {
      userEmail,
      scholarshipId,
      scholarshipName,
      subscribedDate,
      notificationPreferences
    } = req.body;

    // Validation
    if (!userEmail || !scholarshipId) {
      return res.status(400).json({ 
        success: false,
        message: 'userEmail and scholarshipId are required' 
      });
    }

    const db = req.app.locals.db;
    const subscriptionsCollection = db.collection('subscriptions');

    // Check if already subscribed
    const existing = await subscriptionsCollection.findOne({
      userEmail,
      scholarshipId
    });

    if (existing) {
      return res.status(409).json({ 
        success: false,
        message: 'Already subscribed to this scholarship' 
      });
    }

    // Create subscription
    const subscription = {
      userEmail,
      scholarshipId,
      scholarshipName: scholarshipName || 'Unknown Scholarship',
      subscribedDate: subscribedDate ? new Date(subscribedDate) : new Date(),
      notificationPreferences: {
        emailOnUpdate: notificationPreferences?.emailOnUpdate ?? true,
        emailOnDeadlineApproaching: notificationPreferences?.emailOnDeadlineApproaching ?? true,
        emailOnOpen: notificationPreferences?.emailOnOpen ?? true
      },
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await subscriptionsCollection.insertOne(subscription);
    
    console.log(`✅ New subscription created: ${userEmail} → ${scholarshipId}`);

    return res.status(200).json({
      success: true,
      message: 'Subscription created successfully',
      data: {
        _id: result.insertedId,
        ...subscription
      }
    });
  } catch (error) {
    console.error('[POST /subscriptions] Error:', error.message);
    return res.status(500).json({ 
      success: false,
      message: 'Failed to create subscription',
      error: error.message 
    });
  }
});

/**
 * PATCH /subscriptions/:scholarshipId
 * Update notification preferences for a subscription
 * Query: ?email=user@example.com
 * Body: { notificationPreferences: {...} }
 */
router.patch('/subscriptions/:scholarshipId', verifyUserEmail, async (req, res) => {
  try {
    const { scholarshipId } = req.params;
    const { notificationPreferences } = req.body;

    if (!notificationPreferences) {
      return res.status(400).json({ 
        success: false,
        message: 'notificationPreferences is required' 
      });
    }

    const db = req.app.locals.db;
    const subscriptionsCollection = db.collection('subscriptions');
    
    const result = await subscriptionsCollection.updateOne(
      { userEmail: req.userEmail, scholarshipId },
      { 
        $set: { 
          notificationPreferences,
          updatedAt: new Date()
        } 
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ 
        success: false,
        message: 'Subscription not found' 
      });
    }

    console.log(`✅ Subscription updated: ${req.userEmail} → ${scholarshipId}`);

    return res.status(200).json({
      success: true,
      message: 'Preferences updated successfully'
    });
  } catch (error) {
    console.error('[PATCH /subscriptions/:id] Error:', error.message);
    return res.status(500).json({ 
      success: false,
      message: 'Failed to update preferences',
      error: error.message 
    });
  }
});

/**
 * DELETE /subscriptions/:scholarshipId
 * Unsubscribe from a scholarship
 * Query: ?email=user@example.com
 */
router.delete('/subscriptions/:scholarshipId', verifyUserEmail, async (req, res) => {
  try {
    const { scholarshipId } = req.params;

    const db = req.app.locals.db;
    const subscriptionsCollection = db.collection('subscriptions');
    
    const result = await subscriptionsCollection.deleteOne({
      userEmail: req.userEmail,
      scholarshipId
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ 
        success: false,
        message: 'Subscription not found' 
      });
    }

    console.log(`🗑️  Subscription deleted: ${req.userEmail} → ${scholarshipId}`);

    return res.status(200).json({
      success: true,
      message: 'Unsubscribed successfully'
    });
  } catch (error) {
    console.error('[DELETE /subscriptions/:id] Error:', error.message);
    return res.status(500).json({ 
      success: false,
      message: 'Failed to unsubscribe',
      error: error.message 
    });
  }
});

// ============ NOTIFICATIONS ROUTES ============

/**
 * GET /notifications
 * Get all notifications for a user
 * Query: ?email=user@example.com
 */
router.get('/notifications', verifyUserEmail, async (req, res) => {
  try {
    const db = req.app.locals.db;
    const notificationsCollection = db.collection('notifications');
    
    const notifications = await notificationsCollection
      .find({ userEmail: req.userEmail })
      .sort({ createdAt: -1 })
      .toArray();

    return res.status(200).json({
      success: true,
      data: notifications,
      count: notifications.length,
      unreadCount: notifications.filter(n => !n.read).length
    });
  } catch (error) {
    console.error('[GET /notifications] Error:', error.message);
    return res.status(500).json({ 
      success: false,
      message: 'Failed to fetch notifications',
      error: error.message 
    });
  }
});

/**
 * GET /notifications/:id
 * Get a specific notification
 */
router.get('/notifications/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ 
        success: false,
        message: 'Invalid notification ID' 
      });
    }

    const db = req.app.locals.db;
    const notificationsCollection = db.collection('notifications');
    
    const notification = await notificationsCollection.findOne({
      _id: new ObjectId(id)
    });

    if (!notification) {
      return res.status(404).json({ 
        success: false,
        message: 'Notification not found' 
      });
    }

    return res.status(200).json({
      success: true,
      data: notification
    });
  } catch (error) {
    console.error('[GET /notifications/:id] Error:', error.message);
    return res.status(500).json({ 
      success: false,
      message: 'Failed to fetch notification',
      error: error.message 
    });
  }
});

/**
 * POST /notifications
 * Create a new notification
 * Body: {
 *   userEmail, scholarshipName, notificationType, 
 *   scholarshipId, daysLeft?, deadline?, read?
 * }
 */
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

    // Validation
    if (!userEmail || !scholarshipId) {
      return res.status(400).json({ 
        success: false,
        message: 'userEmail and scholarshipId are required' 
      });
    }

    const db = req.app.locals.db;
    const notificationsCollection = db.collection('notifications');

    const notification = {
      userEmail,
      scholarshipName: scholarshipName || 'Unknown Scholarship',
      notificationType: notificationType || 'general',
      scholarshipId,
      daysLeft: daysLeft || null,
      deadline: deadline || null,
      read: read || false,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await notificationsCollection.insertOne(notification);

    console.log(`🔔 Notification created for ${userEmail}: ${notificationType}`);

    return res.status(200).json({
      success: true,
      message: 'Notification created successfully',
      data: {
        _id: result.insertedId,
        ...notification
      }
    });
  } catch (error) {
    console.error('[POST /notifications] Error:', error.message);
    return res.status(500).json({ 
      success: false,
      message: 'Failed to create notification',
      error: error.message 
    });
  }
});

/**
 * PATCH /notifications/:id
 * Mark notification as read/unread
 * Body: { read: boolean }
 */
router.patch('/notifications/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { read } = req.body;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ 
        success: false,
        message: 'Invalid notification ID' 
      });
    }

    const db = req.app.locals.db;
    const notificationsCollection = db.collection('notifications');
    
    const result = await notificationsCollection.updateOne(
      { _id: new ObjectId(id) },
      { 
        $set: { 
          read: read ?? true,
          updatedAt: new Date()
        } 
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ 
        success: false,
        message: 'Notification not found' 
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Notification updated successfully'
    });
  } catch (error) {
    console.error('[PATCH /notifications/:id] Error:', error.message);
    return res.status(500).json({ 
      success: false,
      message: 'Failed to update notification',
      error: error.message 
    });
  }
});

/**
 * DELETE /notifications
 * Clear all notifications for a user
 * Query: ?email=user@example.com
 */
router.delete('/notifications', verifyUserEmail, async (req, res) => {
  try {
    const db = req.app.locals.db;
    const notificationsCollection = db.collection('notifications');
    
    const result = await notificationsCollection.deleteMany({
      userEmail: req.userEmail
    });

    console.log(`🗑️  ${result.deletedCount} notifications deleted for ${req.userEmail}`);

    return res.status(200).json({
      success: true,
      message: 'Notifications cleared successfully',
      deletedCount: result.deletedCount
    });
  } catch (error) {
    console.error('[DELETE /notifications] Error:', error.message);
    return res.status(500).json({ 
      success: false,
      message: 'Failed to clear notifications',
      error: error.message 
    });
  }
});

/**
 * DELETE /notifications/:id
 * Delete a specific notification
 */
router.delete('/notifications/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ 
        success: false,
        message: 'Invalid notification ID' 
      });
    }

    const db = req.app.locals.db;
    const notificationsCollection = db.collection('notifications');
    
    const result = await notificationsCollection.deleteOne({
      _id: new ObjectId(id)
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ 
        success: false,
        message: 'Notification not found' 
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Notification deleted successfully'
    });
  } catch (error) {
    console.error('[DELETE /notifications/:id] Error:', error.message);
    return res.status(500).json({ 
      success: false,
      message: 'Failed to delete notification',
      error: error.message 
    });
  }
});

export default router;
