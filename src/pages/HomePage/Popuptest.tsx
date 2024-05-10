import React, { useState } from 'react';
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

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
const db = getFirestore(app);
export const auth = getAuth(app);
export default function PopupModal({ onClose, onSubmit, onPopupClose }) {
  const [inputValue, setInputValue] = useState('');
  const [submissionTimestamp, setSubmissionTimestamp] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

   /*/ try {
      const docRef = await addDoc(collection(db, "channelNames"), {
        name: inputValue,
        timestamp: new Date().toLocaleString(),
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
/*/
    onSubmit(inputValue); // Pass input value to the parent component
    setInputValue(''); // Clear input value after submission
    
  };

  const handleClose = () => {
    onClose(); // Close the popup modal
    const timestamp = new Date().toLocaleString(); // Get the current timestamp
    setSubmissionTimestamp(timestamp); // Set the submission timestamp
    onPopupClose(timestamp); // Pass the timestamp to the parent component
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSubmit(event);
    }
  };

  return (
    <div className="popup">
      <div className="popup-inner">
        <form onSubmit={handleSubmit} onKeyDown={handleKeyDown} className="absolute inset-0 w-2/12 h-1/4 m-auto border-4 border-sky-500">
          <button className="close-btn text-2xl font-extrabold text-red-600" onClick={handleClose}>
            &times;
          </button>
          <div className="mx-auto text-sm font-medium text-center text-gray-900 dark:text-white">Channel Name</div>
          <input
            type="text"
            id="small-input"
            className="flex mx-auto p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            autoComplete="off"
          />
          {/* Form content */}
          <button className="flex mx-auto text-2xl bg-gradient-to-b from-violet-600 to-indigo-600 text-gray-200 mt-2 py-0.5 px-2 border border-gray-400 rounded shadow hover:scale-105"
           type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
