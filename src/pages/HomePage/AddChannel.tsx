// AddChannel.js
import React, { useState } from 'react';
import Popuptest from './Popuptest';
import LeftSideBar from './LeftSideBar';

export default function AddChannel() {
  const [input, setInput] = useState([]);
  const [channelName, setChannelName] = useState("Tailwind and Create React App");

  const handleFormSubmit = (channelName) => {
    // Handle form submission here
    setInput([...input, <LeftSideBar key={input.length} channelName={channelName} />]);
  };

  const closePopup = () => {
    setInput(input.slice(0, -1)); // Remove the last item from the input state
  };
  const handleAddChannel = (newChannelName) => {
    setChannelName(newChannelName);
    setShowPopup(false);
  };
  return (
    <div className="flex mx-auto flex-col-reverse">
      {input.map((item) => (
        <div key={item.key}>{item}</div>
      ))}
      <button
        onClick={() => setShowPopup(true)}
        className="flex mx-auto p-2 bg-purple-500 m-5 hover:scale-105"
        onClick={() => setInput([...input, <Popuptest key={input.length} onClose={closePopup} onSubmit={handleFormSubmit} />])}
      >
        Add Channel
      </button>
    </div>
  );
}
