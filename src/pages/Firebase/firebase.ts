import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import "firebase/firestore";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "newcommunication-9a2cc.firebaseapp.com",
  projectId: "newcommunication-9a2cc",
  storageBucket: "newcommunication-9a2cc.appspot.com",
  messagingSenderId: "932971393034",
  appId: "1:932971393034:web:f4c0ea93ff185d1ba36ff3",
  measurementId: "G-M105705D07"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
// Initialize Firebase
// const analytics = getAnalytics(app);
export const messaging = getMessaging(app);
// // Add the public key generated from the console here.
// getToken(messaging, {vapidKey: "BPBOeBK4iBxGZiK5_SXLP_s35mCcCRJWw0VOTokm62iiD8__q1VOyE8t4UbhKOM6u03GFo8IaBfqg3K79k-OCo0"})
//   .then((currentToken:any) => {
//     if (currentToken) {
//       console.log("current token for client: ", currentToken);
//     } else {
//       console.log("No registration token available. Request permission to generate one.");
//     }
//   });
//   function requestPermission() {
//     console.log('Requesting permission...');
//     Notification.requestPermission().then((permission) => {
//       if (permission === 'granted') {
//         console.log('Notification permission granted.');
//       }else{
//         console.log('Unable to get permission to notify.');
//       }
//     })
//   }
//   requestPermission()
