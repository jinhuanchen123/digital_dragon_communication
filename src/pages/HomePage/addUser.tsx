import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from "react";
import Chatbox from './UserBox';

export default function AddUser() {
  const [isChatboxVisible, setIsChatboxVisible] = useState(false);

  const handleClick = () => {
    setIsChatboxVisible(!isChatboxVisible);
  };

  return (
    <>
      <FontAwesomeIcon
        icon={faPlus}
        onClick={handleClick}
        style={{ cursor: 'pointer' }} // Add some cursor styling for better UX
      />
      {isChatboxVisible && <Chatbox />}
    </>
  );
}
