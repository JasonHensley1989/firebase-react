// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

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
export const auth = getAuth(app);