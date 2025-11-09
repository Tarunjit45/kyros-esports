import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  // Your Firebase config here
  // This should be moved to environment variables in production
  apiKey: "AIzaSyBA8fL0ZtYMhoRVK18bWUyf1pVzt9SsfdA",
  authDomain: "kyros-161ff.firebaseapp.com",
  projectId: "kyros-161ff",
  storageBucket: "kyros-161ff.firebasestorage.app",
  messagingSenderId: "31149119972",
  appId: "1:31149119972:web:fd1074a496640854490ff1",
  measurementId: "G-EQWWY2J2XD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };

// Note: You'll need to replace the placeholder values with your actual Firebase config
// and set up Firebase Storage and Firestore in your Firebase Console
