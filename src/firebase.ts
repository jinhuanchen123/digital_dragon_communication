import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "digital-dragon-communication.firebaseapp.com",
  projectId: "digital-dragon-communication",
  storageBucket: "digital-dragon-communication.appspot.com",
  messagingSenderId: "492992756134",
  appId: "1:492992756134:web:dc60188d83b9364feb7767",
  measurementId: "G-VTM6JZ76J1",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
// const analytics = getAnalytics(app);
