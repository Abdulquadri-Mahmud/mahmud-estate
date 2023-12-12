import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mahmud-estate.firebaseapp.com",
  projectId: "mahmud-estate",
  storageBucket: "mahmud-estate.appspot.com",
  messagingSenderId: "26308818838",
  appId: "1:26308818838:web:9ac8de4030837bb5c18fb7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);