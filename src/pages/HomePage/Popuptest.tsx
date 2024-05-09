// Popuptest.js

import React, { useState } from 'react';

export default function PopupModal({ onClose, onSubmit }) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(inputValue); // Pass input value to the parent component
    onClose(); // Close the popup modal
  };

  return (
    <div className="popup">
      <div className="popup-inner">
        <form onSubmit={handleSubmit} className="absolute inset-0 size-1/2 m-auto border-4 border-sky-500">
          <button className="close-btn text-2xl text-red-600" onClick={onClose}>
            &times;
          </button>
          <div className="mx-auto text-sm font-medium text-center text-gray-900 dark:text-white">Channel Name</div>
          <input
            type="text"
            id="small-input"
            className="flex mx-auto p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          {/* Form content */}
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
