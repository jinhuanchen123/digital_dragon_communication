// Add your service worker code here
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging.js');
import { getMessaging, getToken } from "firebase/messaging";
firebase.initializeApp({
    apiKey: "AIzaSyA97IaCXJg_bAQ0OAVB1VclIyWUHJLL-xc",
    authDomain: "digital-dragon-communication.firebaseapp.com",
    databaseURL: "https://digital-dragon-communication-default-rtdb.firebaseio.com",
    projectId: "digital-dragon-communication",
    storageBucket: "digital-dragon-communication.appspot.com",
    messagingSenderId: "492992756134",
    appId: "1:492992756134:web:dc60188d83b9364feb7767",
    measurementId: "G-VTM6JZ76J1"
});
export const messaging = getMessaging(app);

// Add the public key generated from the console here.
getToken(messaging, {vapidKey: "BPBOeBK4iBxGZiK5_SXLP_s35mCcCRJWw0VOTokm62iiD8__q1VOyE8t4UbhKOM6u03GFo8IaBfqg3K79k-OCo0"})
  .then((currentToken) => {
    if (currentToken) {
      console.log("current token for client: ", currentToken);
    } else {
      console.log("No registration token available. Request permission to generate one.");
    }
  });
  function requestPermission() {
    console.log('Requesting permission...');
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        console.log('Notification permission granted.');
      }else{
        console.log('Unable to get permission to notify.');
      }
    })
  }
  requestPermission()