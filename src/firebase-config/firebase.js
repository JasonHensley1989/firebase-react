// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { collection, getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyB30tSZbXAVZ77tQQlVlLQYLnkqyq7ERII",
  authDomain: "fir-react-176c4.firebaseapp.com",
  projectId: "fir-react-176c4",
  storageBucket: "fir-react-176c4.appspot.com",
  messagingSenderId: "659034127905",
  appId: "1:659034127905:web:6a15da5153bb92e9e4ed60"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Authorization
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Database Firestore
export const db = getFirestore(app);
export const moviesCollectionRef = collection(db, "movies");
export const storage = getStorage(app)