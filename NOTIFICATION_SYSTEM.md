# 🔔 Système de Notifications - Documentation

## Vue d'ensemble

Un système complet de notifications a été implémenté qui permet aux utilisateurs de s'abonner à des bourses spécifiques et de recevoir des notifications sur:
- ✅ Mises à jour des bourses
- ✅ Approche des dates limites de candidature
- ✅ Nouvelles bourses ouvertes

## 🏗️ Architecture

### 1. **Frontend Components**

#### `useNotifications` Hook
**Fichier:** `src/hooks/useNotifications.jsx`

Un hook personnalisé qui gère:
- Récupération des notifications de l'utilisateur
- Gestion des abonnements aux bourses
- Mise à jour des préférences de notification
- Marquage des notifications comme lues

```javascript
const {
  notifications,
  subscribedScholarships,
  loading,
  subscribeToScholarship,
  unsubscribeFromScholarship,
  updateNotificationPreferences,
  isSubscribed,
  markAsRead,
  clearNotifications
} = useNotifications(userEmail)
```

#### `SubscribeButton` Component
**Fichier:** `src/components/SubscribeButton.jsx`

Bouton réutilisable pour:
- S'abonner/se désabonner aux bourses
- Afficher l'état d'abonnement
- Gérer l'authentification utilisateur

**Utilisation:**
```jsx
<SubscribeButton 
  scholarshipId={scholarship._id}
  scholarshipName={scholarship.university_name}
/>
```

#### `NotificationBell` Component
**Fichier:** `src/components/NotificationBell.jsx`

Affiche:
- Icône de cloche avec badge de compteur
- Dropdown avec liste des notifications non lues
- Lien vers les paramètres de notification
- Auto-actualisation toutes les 30 secondes

**Placement:** Navbar (avant les boutons de connexion)

#### `NotificationSettings` Page
**Fichier:** `src/pages/Dashboard/NotificationSettings/NotificationSettings.jsx`
**Route:** `/dashboard/notification-settings`

Permet aux utilisateurs de:
- Voir tous les abonnements actifs
- Gérer les préférences par bourse:
  - Notifications de mises à jour
  - Alertes de deadline (7 jours avant)
  - Notifications d'ouverture
- Se désabonner

### 2. **Backend API Endpoints**

Les endpoints suivants doivent être implémentés sur votre serveur:

```
GET  /subscriptions                     # Récupérer tous les abonnements (admin)
GET  /subscriptions?email=user@email    # Récupérer les abonnements d'un utilisateur
GET  /subscriptions/scholarship/:id     # Récupérer subscribers d'une bourse

POST /subscriptions                     # S'abonner à une bourse
{
  userEmail: string,
  scholarshipId: string,
  scholarshipName: string,
  subscribedDate: ISO8601,
  notificationPreferences: {
    emailOnUpdate: boolean,
    emailOnDeadlineApproaching: boolean,
    emailOnOpen: boolean
  }
}

DELETE /subscriptions/:scholarshipId?email=user@email  # Se désabonner
PATCH  /subscriptions/:scholarshipId?email=user@email  # Mettre à jour les préférences

GET    /notifications?email=user@email  # Récupérer les notifications
GET    /notifications/:id               # Récupérer détails notification

POST   /notifications                   # Créer une notification
{
  userEmail: string,
  scholarshipName: string,
  notificationType: 'deadline-approaching' | 'new-scholarship' | 'scholarship-updated',
  scholarshipId: string,
  read: boolean,
  createdAt: ISO8601,
  daysLeft?: number (for deadline notifications),
  deadline?: string (for deadline notifications)
}

DELETE /notifications?email=user@email  # Supprimer toutes les notifications
PATCH  /notifications/:id               # Marquer comme lue

GET    /notifications/:id
PATCH  /notifications/:id               # { read: true }
```

### 3. **Service de Notifications (Scheduler)**

**Fichier:** `notification-service.js`

Scripts pour envoyer des notifications automatiquement:

#### `sendDeadlineNotifications()`
Envoie des alertes 7 jours avant la date limite

#### `sendNewScholarshipNotifications(scholarshipId)`
Notifie tous les utilisateurs quand une nouvelle bourse est ajoutée

#### `sendSubscriptionUpdateNotifications(scholarshipId)`
Notifie les abonnés quand une bourse est mise à jour

#### `scheduleDeadlineNotifications()`
Planifie les notifications quotidiennes à 9h du matin

**Utilisation:**
```javascript
import { 
  sendDeadlineNotifications,
  sendNewScholarshipNotifications,
  sendSubscriptionUpdateNotifications,
  scheduleDeadlineNotifications 
} from './notification-service.js'

// Exécuter immédiatement
await sendDeadlineNotifications()
await sendNewScholarshipNotifications(scholarshipId)
await sendSubscriptionUpdateNotifications(scholarshipId)

// Planifier les notifications quotidiennes
scheduleDeadlineNotifications()
```

## 🔄 Configuration Requise

### Modèle de Données Subscription
```javascript
{
  _id: ObjectId,
  userEmail: string,
  scholarshipId: string,
  scholarshipName: string,
  subscribedDate: Date,
  notificationPreferences: {
    emailOnUpdate: boolean,
    emailOnDeadlineApproaching: boolean,
    emailOnOpen: boolean
  }
}
```

### Modèle de Données Notification
```javascript
{
  _id: ObjectId,
  userEmail: string,
  scholarshipName: string,
  notificationType: string,
  scholarshipId: string,
  read: boolean,
  createdAt: Date,
  daysLeft?: number,
  deadline?: string
}
```

## 🚀 Intégration Pas à Pas

### 1. Backend - Créer les Collections MongoDB
```javascript
// Subscriptions Collection
db.createCollection("subscriptions", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["userEmail", "scholarshipId"],
      properties: {
        userEmail: { bsonType: "string" },
        scholarshipId: { bsonType: "string" },
        scholarshipName: { bsonType: "string" },
        subscribedDate: { bsonType: "date" },
        notificationPreferences: {
          bsonType: "object",
          properties: {
            emailOnUpdate: { bsonType: "bool" },
            emailOnDeadlineApproaching: { bsonType: "bool" },
            emailOnOpen: { bsonType: "bool" }
          }
        }
      }
    }
  }
})

// Notifications Collection
db.createCollection("notifications", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["userEmail", "scholarshipId"],
      properties: {
        userEmail: { bsonType: "string" },
        scholarshipName: { bsonType: "string" },
        notificationType: { bsonType: "string" },
        scholarshipId: { bsonType: "string" },
        read: { bsonType: "bool" },
        createdAt: { bsonType: "date" },
        daysLeft: { bsonType: "int" },
        deadline: { bsonType: "string" }
      }
    }
  }
})
```

### 2. Backend - Implémenter les Routes API
Ajouter les routes d'API listées ci-dessus à votre serveur Express/Node.js

### 3. Frontend - Vérifier les Imports
Tous les composants et hooks sont déjà créés et intégrés:
- ✅ `useNotifications` hook créé
- ✅ `SubscribeButton` intégré dans ScholarshipDetails
- ✅ `NotificationBell` intégré dans NavBar
- ✅ `NotificationSettings` page créée et routée
- ✅ Routes ajoutées

### 4. Environment Variables
Assurez-vous que votre `.env` contient:
```
VITE_API_BASE_URL=https://scholarship-portalbd-server.vercel.app
```

## 📋 Flux d'Utilisation

### Scénario 1: S'abonner à une Bourse
1. Utilisateur clique sur "S'abonner aux notifications" sur la page de détails
2. S'il n'est pas connecté → redirection vers login
3. S'il est connecté → création d'une subscription
4. Confirmation avec toast "Vous êtes abonné"

### Scénario 2: Recevoir une Notification
1. Système envoie une notification (via le scheduler ou manuellement)
2. L'icône de cloche affiche le badge de compteur
3. Utilisateur voit la notification dans le dropdown
4. Utilisateur peut cliquer pour marquer comme lue
5. Lire les paramètres détaillés en cliquant "Gérer les notifications"

### Scénario 3: Gérer les Préférences
1. Utilisateur navigue vers `/dashboard/notification-settings`
2. Voir tous les abonnements actifs
3. Pour chaque bourse:
   - Cocher/décocher les préférences d'email
   - Cliquer "Enregistrer les préférences"
   - Ou "Désabonner" pour arrêter les notifications

## 🎯 Prochaines Étapes

1. **Intégration Backend COMPLÈTE**
   - Créer les collections MongoDB
   - Implémenter toutes les routes API
   - Ajouter la validation et l'authentification

2. **Service d'Email**
   - Intégrer SendGrid/Gmail/Nodemailer
   - Créer les templates d'email
   - Envoyer des emails en plus des notifications in-app

3. **Tâches Planifiées**
   - Configurer Node-cron ou Agenda.js
   - Exécuter `sendDeadlineNotifications` quotidiennement
   - Exécuter `sendSubscriptionUpdateNotifications` lors de mises à jour

4. **SMS Notifications (Optionnel)**
   - Intégrer Twilio
   - Permettre aux utilisateurs de recevoir des SMS

5. **Push Notifications (Optionnel)**
   - Implémenter Firebase Cloud Messaging
   - Ajouter le service worker
   - Notifications push côté utilisateur

## 🔐 Considérations de Sécurité

✅ **Déjà Implémenté:**
- Vérification utilisateur avant abonnement
- Validation email dans les requests
- PrivateRoute pour la page de notifications

⚠️ **À Ajouter au Backend:**
- Vérification JWT/tokens
- Validation des emails utilisateur
- Limitation de débit (rate limiting)
- Sanitization des inputs

## 📊 Monitoring

Pour surveiller le système, vous pouvez ajouter des logs:

```javascript
// Dans votre serveur backend
app.post('/subscriptions', (req, res) => {
  console.log(`📌 New subscription: ${req.body.userEmail} → ${req.body.scholarshipId}`)
  // ... traiter la subscription
})

app.post('/notifications', (req, res) => {
  console.log(`🔔 New notification sent to ${req.body.userEmail}`)
  // ... traiter la notification
})
```

Puis visualiser dans les logs/dashboard de votre plateforme d'hébergement (Vercel, Heroku, etc.)

---

## 📞 Support

Pour des questions ou des ajustements:
- Email: klancine011@mail.com
- Phone: 0712129409 / 0710758249
