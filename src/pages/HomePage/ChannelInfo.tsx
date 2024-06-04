import React, { useState, useEffect } from "react";
import { auth, db } from '../Firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import ChannelInfo_Style from "./ChannelInfo.module.css"; 
import avatarImage from '../path/to/avatar.png';  // Ensure the path to avatar.png is correct

const ChannelInfo: React.FC = () => {
  const [channelData, setChannelData] = useState<any>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isInfoOpen, setIsInfoOpen]=useState<string | null>(null)
  

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUserId(currentUser.uid);
    } else {
      setError("User not authenticated.");
    }
  }, []);

  const handleInfo = async () => {
    if (!userId) {
      console.error("User ID not found.");
      return;
    }

    try {
      const userDocRef = doc(db, 'text_channels', userId);
      const docSnapshot = await getDoc(userDocRef);
      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        setChannelData(data);
        // Store user data in local storage
        localStorage.setItem('channelData', JSON.stringify(data));
      } else {
        console.log("Channel data not found.");
        setError("Channel data not found.");
      }
    } catch (error) {
      console.error("Error fetching channel data:", error);
      setError("Error fetching channel data.");
    }
  };

  return (
    <div>
      <FontAwesomeIcon
        icon={faInfoCircle}
        className={ChannelInfo_Style.customIconStyle}
        onClick={handleInfo}
      />
      {error && <p className={ChannelInfo_Style.error}>{error}</p>}
      {channelData && (
        <div className={ChannelInfo_Style.channelInfo}>
          <h2>Channel Information</h2>
          <p>Name: {channelData.channelName}</p>
          <p>Channel ID: {userId}</p>
          {/* Render other channel details as needed */}
        </div>
      )}
    </div>
  );
};

export default ChannelInfo;
