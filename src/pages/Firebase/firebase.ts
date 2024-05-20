import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "digital-dragon-communication.firebaseapp.com",
  databaseURL:
    "https://digital-dragon-communication-default-rtdb.firebaseio.com",
  projectId: "digital-dragon-communication",
  storageBucket: "digital-dragon-communication.appspot.com",
  messagingSenderId: "492992756134",
  appId: "1:492992756134:web:dc60188d83b9364feb7767",
  measurementId: "G-VTM6JZ76J1",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);

// Initialize Firebase

// const analytics = getAnalytics(app);
