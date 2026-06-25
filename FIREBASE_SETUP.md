# 🔥 Firebase Setup Guide

Follow these steps to configure Firebase for your CAT Exam Preparation Platform.

## Step-by-Step Setup

### 1. Create Firebase Project

1. Visit [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"**
3. Enter project name: `cat-exam-prep` (or your preferred name)
4. Disable Google Analytics (optional for this project)
5. Click **"Create project"**

### 2. Create Firestore Database

1. Click **"Firestore Database"** in the left sidebar
2. Click **"Create database"**
3. Select **"Start in test mode"** (we'll update rules later)
4. Choose your preferred region (e.g., `us-central`)
5. Click **"Enable"**

### 3. Configure Firestore Security Rules

1. Go to **"Firestore Database"** → **"Rules"** tab
2. Replace the default rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow anyone to read and write test attempts
    // This is safe for private use (localhost or controlled access)
    match /testAttempts/{attemptId} {
      allow read, write: if true;
    }
  }
}
```

**Note:** If you want the rules to expire after 30 days (like the default), use this instead:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /testAttempts/{attemptId} {
      allow read, write: if request.time < timestamp.date(2026, 7, 25);
    }
  }
}
```

3. Click **"Publish"**

### 4. Get Your Firebase Configuration

1. Click the **gear icon** ⚙️ next to "Project Overview"
2. Select **"Project settings"**
3. Scroll down to **"Your apps"** section
4. Click the **Web icon** `</>`
5. Register app:
   - App nickname: `CAT Exam Web App`
   - **Don't** check Firebase Hosting
   - Click **"Register app"**
6. Copy the `firebaseConfig` object

### 5. Update Your Project

1. Open `src/firebase.js` in your code editor
2. Replace the placeholder config with your actual config:

```javascript
const firebaseConfig = {
  apiKey: "AIza...",                    // Your actual API key
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

3. Save the file

### 6. Test Your Setup

1. Run the development server:
   ```bash
   npm run dev
   ```

2. Open `http://localhost:5173` in your browser

3. Try to:
   - ✅ Take a test
   - ✅ View results
   - ✅ Check history

### 7. Verify Data in Firebase Console

1. After taking a test, go to **Firestore Database**
2. You should see a collection called `testAttempts`
3. Each test attempt will be stored as a document

## 🔒 Production Security (Important!)

Before deploying to production:

### Update Firestore Rules for Production

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /testAttempts/{attemptId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null && 
                       request.auth.uid == request.resource.data.userId &&
                       request.resource.data.timestamp == request.time;
      allow update, delete: if false; // Prevent updates and deletes
    }
  }
}
```

### Enable App Check (Recommended)

1. Go to **App Check** in Firebase Console
2. Click **"Get started"**
3. Register your app with reCAPTCHA
4. Follow the setup instructions

### Use Environment Variables

Instead of hardcoding Firebase config in `src/firebase.js`:

1. Create `.env` file:
   ```
   VITE_FIREBASE_API_KEY=your-api-key
   VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-project
   VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
   VITE_FIREBASE_APP_ID=1:123456789:web:abc123
   ```

2. Update `src/firebase.js`:
   ```javascript
   const firebaseConfig = {
     apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
     authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
     projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
     storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
     messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
     appId: import.meta.env.VITE_FIREBASE_APP_ID
   };
   ```

## 🆘 Troubleshooting

### "Firebase: Error (auth/configuration-not-found)"
- Make sure you've enabled Email/Password authentication
- Check that your Firebase config is correct

### "Missing or insufficient permissions"
- Verify Firestore rules are set correctly
- Make sure user is authenticated

### "Network error"
- Check your internet connection
- Verify Firebase project is active

## 📚 Useful Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/get-started)
- [Firebase Authentication](https://firebase.google.com/docs/auth)

---

Need help? Check the main README.md or create an issue!
