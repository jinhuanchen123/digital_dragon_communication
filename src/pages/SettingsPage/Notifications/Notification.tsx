import React, { useState } from 'react';
import RightSidebar from '../SettingLeftSide';
import notiStyles from './Notification.module.css'; // Import Notification CSS module with a unique alias


function Notifications() {
  type NotificationType = keyof typeof notificationStatus;

const [notificationStatus, setNotificationStatus] = useState(
  {
  replies: true,
  directMessages: true,
  mentions: true,
  invites: true
}
);

// Function to handle mute toggle
const handleMuteToggle = (type: NotificationType) => {
  setNotificationStatus(prevState => ({
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
        <div className={notiStyles.header}>
          <h1>Notification</h1>
        </div>
        {/* Replies section with mute toggle */}
        <div>
          <input
            type="checkbox"
            id="muteReplies"
            checked={notificationStatus.replies}
            onChange={() => handleMuteToggle('replies')}
          />
          <label htmlFor="muteReplies">Replies</label>
         
        </div>
        {/* Direct Messages section with mute toggle */}
        <div>
          <input
            type="checkbox"
            id="muteDirectMessages"
            checked={notificationStatus.directMessages}
            onChange={() => handleMuteToggle('directMessages')}
          />
          <label htmlFor="muteDirectMessages">Direct Messages</label>
        </div>
        {/* Mentions section with mute toggle */}
        <div>
          <input
            type="checkbox"
            id="muteMentions"
            checked={notificationStatus.mentions}
            onChange={() => handleMuteToggle('mentions')}
          />
          <label htmlFor="muteMentions">Mentions</label>
        </div>
        {/* Invites section with mute toggle */}
        <div>
  <input
    type="checkbox"
    id="muteInvites"
    checked={notificationStatus.invites}
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
