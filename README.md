# 🎯 Zeal Prep - CAT Exam Preparation Platform

A modern, feature-rich test preparation platform built with **React + Vite + Firebase** for CAT exam practice tests.

## ✨ Features

- ⏱️ **30-Minute Timer** - Auto-submit when time expires
- 📊 **Instant Results** - Detailed score breakdown with explanations
- 📚 **Test History** - Track all test attempts with timestamps
- 🎨 **Beautiful UI** - Modern design with Tailwind CSS
- ☁️ **Cloud Storage** - All data stored in Firebase Firestore
- 📱 **Responsive** - Works on desktop, tablet, and mobile
- 🚀 **No Login Required** - Direct access to tests

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Firebase account

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd CATTestWebsite
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Firebase** (See Firebase Setup section below)

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 🔥 Firebase Setup

### Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter project name (e.g., "cat-exam-prep")
4. Follow the setup wizard

### Step 2: Create Firestore Database

1. In Firebase Console, go to **Firestore Database**
2. Click "Create database"
3. Choose "Start in test mode" (for development)
4. Select your preferred location
5. Click "Enable"

### Step 3: Set Up Firestore Rules

Go to **Firestore Database > Rules** and update with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /testAttempts/{document} {
      allow read, write: if true;
    }
  }
}
```

### Step 4: Get Firebase Config

1. In Firebase Console, go to **Project Settings** (gear icon)
2. Scroll down to "Your apps"
3. Click the web icon `</>`
4. Register your app (name: "CAT Exam Web")
5. Copy the Firebase config object

### Step 5: Update Firebase Config in Project

Open `src/firebase.js` and replace the config:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

## 📁 Project Structure

```
CATTestWebsite/
├── src/
│   ├── components/
│   │   ├── History.jsx          # Test history
│   │   ├── Home.jsx             # Landing page
│   │   ├── Results.jsx          # Test results page
│   │   └── TestPage.jsx         # Test taking interface
│   ├── data/
│   │   └── testData.js          # Test questions data
│   ├── App.jsx                  # Main app component
│   ├── firebase.js              # Firebase configuration
│   ├── index.css                # Global styles
│   └── main.jsx                 # Entry point
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
```

## 🎮 How to Use

### For Users

1. **Choose a Test** - Select from available practice tests on home page
2. **Take the Test** - Answer questions within 30 minutes
3. **View Results** - See your score and detailed explanations
4. **Track Progress** - Check history to see all attempts and improvement

## 📊 Test Data Structure

Tests are defined in `src/data/testData.js`. Each test includes:

- Test metadata (name, subject, duration)
- Array of questions with:
  - Question text
  - Multiple choice options
  - Correct answer index
  - Explanation

## 🛠️ Build for Production

```bash
npm run build
```

The built files will be in the `dist` folder, ready for deployment.

## 🚀 Deployment

You can deploy to:

- **Firebase Hosting**
  ```bash
  npm install -g firebase-tools
  firebase login
  firebase init hosting
  npm run build
  firebase deploy
  ```

- **Vercel** - Connect your GitHub repo
- **Netlify** - Drag & drop the `dist` folder

## 🔒 Security Notes

- Never commit Firebase config with real credentials to public repos
- Use environment variables for sensitive data
- Update Firestore security rules for production
- Enable Firebase App Check for additional security

## 📝 License

MIT License - feel free to use this project for your needs!

## 🤝 Contributing

Feel free to submit issues and pull requests!

---

Built with ❤️ for CAT exam aspirants
