import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// TODO: Replace with your Firebase config
// Get this from Firebase Console -> Project Settings -> General -> Your apps -> Web app
const firebaseConfig = {
  apiKey: "AIzaSyCJn8409uufwKy4LYgtXjW-WGdVWTIvbV8",
  authDomain: "cat-exam-prep-ba333.firebaseapp.com",
  projectId: "cat-exam-prep-ba333",
  storageBucket: "cat-exam-prep-ba333.firebasestorage.app",
  messagingSenderId: "184353521635",
  appId: "1:184353521635:web:a38a6195c07f64e972ead6",
  measurementId: "G-3RNFRB7HYC"
};

// Initialize Firebase with error handling
let app;
let db;

try {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
} catch (error) {
  console.warn('Firebase not configured properly. Please update src/firebase.js with your actual config.');
  console.warn('The app will work but test results won\'t be saved until Firebase is configured.');
}

export { db };
export default app;
