import React, { useState } from 'react';
import Popuptest from './Popuptest';
import LeftSideBar from './LeftSideBar';

export default function AddChannel() {
  const [input, setInput] = useState([]);
  const [channelName, setChannelName] = useState("Tailwind and Create React App");
  const [showPopup, setShowPopup] = useState(false);

  const handleFormSubmit = (newChannelName) => {
    // Render LeftSideBar component after form submission
    setInput([...input, <LeftSideBar key={input.length} channelName={newChannelName} />]);
    setShowPopup(false);
  };

  const closePopup = () => {
    setInput(input.slice(0, -1)); // Remove the last item from the input state
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
      >
        Add Channel
      </button>
      {showPopup && <Popuptest onClose={closePopup} onSubmit={handleFormSubmit} channelName={channelName} />}
    </div>
  );
}
