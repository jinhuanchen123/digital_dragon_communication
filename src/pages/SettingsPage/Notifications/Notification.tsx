import React, { useState, useContext } from 'react';
import RightSidebar from '../SettingLeftSide';
import notiStyles from './Notification.module.css'; // Import Notification CSS module with a unique alias
import { ThemeContext } from "../../../contexts/ThemeContext.jsx"


function Notifications() {

  const { toggleTheme, currentTheme, themes } = useContext(ThemeContext);
  const theme = themes[currentTheme];

  type NotificationType = keyof typeof muteStatus;

const [muteStatus, setMuteStatus] = useState({
  replies: false,
  directMessages: false,
  mentions: false,
  invites: false
});

// Function to handle mute toggle
const handleMuteToggle = (type: NotificationType) => {
  setMuteStatus(prevState => ({
    ...prevState,
    [type]: !prevState[type]
  }));
};
const handleInvitesClick = (e: React.MouseEvent<HTMLLabelElement, MouseEvent>) => {
  e.stopPropagation(); // Prevent event propagation
  console.log("Invites label clicked!");

};
  return (
    <div className={notiStyles.container1_notification}>
      <RightSidebar />

      <div className={notiStyles.notification_section}>
        <div className={notiStyles.header} style={{background: theme.bgd}}>
          <h1 className={notiStyles.header1}>Notification</h1>
        </div>
        {/* Replies section with mute toggle */}
        <div>
          <input
            type="checkbox"
            id="muteReplies"
            checked={muteStatus.replies}
            onChange={() => handleMuteToggle('replies')}
          />
          <label htmlFor="muteReplies">Replies</label>
         
        </div>
        {/* Direct Messages section with mute toggle */}
        <div>
          <input
            type="checkbox"
            id="muteDirectMessages"
            checked={muteStatus.directMessages}
            onChange={() => handleMuteToggle('directMessages')}
          />
          <label htmlFor="muteDirectMessages">Direct Messages</label>
        </div>
        {/* Mentions section with mute toggle */}
        <div>
          <input
            type="checkbox"
            id="muteMentions"
            checked={muteStatus.mentions}
            onChange={() => handleMuteToggle('mentions')}
          />
          <label htmlFor="muteMentions">Mentions</label>
        </div>
        {/* Invites section with mute toggle */}
        <div>
  <input
    type="checkbox"
    id="muteInvites"
    checked={muteStatus.invites}
    onChange={() => handleMuteToggle('invites')}
  />
  <label htmlFor="muteInvites" onClick={handleInvitesClick}>
    Invites: Friends Requests, Groups, and Events
  </label>
</div>


      </div>
   
    </div>
  );
}

export default Notifications;
