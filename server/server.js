// server.js
// Main backend server with notifications system integrated

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { MongoClient, ServerApiVersion } from 'mongodb';
import notificationRoutes from './routes/notifications.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = process.env.DB_NAME || 'scholarship-portal';

// ============ MIDDLEWARE ============
app.use(cors());
app.use(express.json());

// ============ MONGODB CONNECTION ============
const client = new MongoClient(MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Connect to MongoDB
async function connectDB() {
  try {
    await client.connect();
    const db = client.db(DB_NAME);
    
    // Store db instance in app.locals for routes
    app.locals.db = db;
    
    console.log('✅ Connected to MongoDB');
    
    // Create collections if they don't exist
    await createCollections(db);
    
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1);
  }
}

// Create required collections with indexes
async function createCollections(db) {
  try {
    // Subscriptions collection
    await db.createCollection('subscriptions').catch(() => {
      console.log('Subscriptions collection already exists');
    });
    
    // Create indexes for subscriptions
    const subscriptionsCollection = db.collection('subscriptions');
    await subscriptionsCollection.createIndex({ userEmail: 1, scholarshipId: 1 });
    await subscriptionsCollection.createIndex({ scholarshipId: 1 });
    await subscriptionsCollection.createIndex({ createdAt: 1 });
    
    // Notifications collection
    await db.createCollection('notifications').catch(() => {
      console.log('Notifications collection already exists');
    });
    
    // Create indexes for notifications
    const notificationsCollection = db.collection('notifications');
    await notificationsCollection.createIndex({ userEmail: 1, createdAt: -1 });
    await notificationsCollection.createIndex({ scholarshipId: 1 });
    await notificationsCollection.createIndex({ read: 1 });
    await notificationsCollection.createIndex({ createdAt: -1 });
    
    console.log('✅ Collections initialized with indexes');
  } catch (error) {
    console.error('Error creating collections:', error.message);
  }
}

// ============ ROUTES ============

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// API documentation
app.get('/api', (req, res) => {
  res.json({
    message: 'Scholarship Portal API',
    version: '1.0.0',
    endpoints: {
      notifications: {
        subscriptions: [
          { method: 'GET', path: '/subscriptions?email=user@example.com', description: 'Get user subscriptions' },
          { method: 'GET', path: '/subscriptions/scholarship/:id', description: 'Get scholarship subscribers' },
          { method: 'POST', path: '/subscriptions', description: 'Create subscription' },
          { method: 'PATCH', path: '/subscriptions/:id?email=user@example.com', description: 'Update preferences' },
          { method: 'DELETE', path: '/subscriptions/:id?email=user@example.com', description: 'Unsubscribe' }
        ],
        notifications: [
          { method: 'GET', path: '/notifications?email=user@example.com', description: 'Get user notifications' },
          { method: 'GET', path: '/notifications/:id', description: 'Get notification details' },
          { method: 'POST', path: '/notifications', description: 'Create notification' },
          { method: 'PATCH', path: '/notifications/:id', description: 'Mark as read' },
          { method: 'DELETE', path: '/notifications/:id', description: 'Delete notification' },
          { method: 'DELETE', path: '/notifications?email=user@example.com', description: 'Clear all notifications' }
        ]
      }
    }
  });
});

// Notification routes
app.use('/', notificationRoutes);

// ============ ERROR HANDLING ============

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    path: req.path,
    method: req.method
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('❌ Error:', err.message);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Server error'
  });
});

// ============ SERVER STARTUP ============

async function startServer() {
  try {
    // Connect to database
    await connectDB();
    
    // Start server
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`📚 API Documentation: http://localhost:${PORT}/api`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🛑 Shutting down gracefully...');
  await client.close();
  process.exit(0);
});

// Start the server
startServer();

export default app;
