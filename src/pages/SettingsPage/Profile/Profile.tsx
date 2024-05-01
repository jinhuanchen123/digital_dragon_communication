// Inside your Profile component

import React, { useState, useRef } from 'react';
import RightSidebar from '../LeftSidebar';
import styles from './Profile.module.css';

function Profile() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  const handleEditProfileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className={styles.container1_profile}>
      <RightSidebar />
      <div className={styles.profile_section}>
        <div className={styles.header}>
          <h1>Profile</h1>
        </div>
        <div className={styles.big_card}>
          <div className={styles.card}>
            <div className={styles.avatar}>
              {/* Original Image */}
              
              
              {/* Custom button to trigger file input */}
              <button className={styles.editButton} onClick={handleEditProfileClick}>
                Edit Profile
              </button>
              {/* Hidden file input */}
              <input
                type="file"
                accept=".jpg,.jpeg,.png"
                ref={fileInputRef}
                onChange={handleFileSelect}
                className={styles.hiddenInput}
              />
              {/* Display the selected image */}
              {selectedFile && (
                <div>
                  <img
                    src={URL.createObjectURL(selectedFile)}
                    alt="Selected Image"
                    className={styles.profile_image}
                  />
                </div>
              )}
            </div>
            {/* Rest of your profile content */}
            <div className={styles.form}>
              <form className={styles.info}>
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" />
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" />
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" />
                <label htmlFor="newPassword">New Password:</label>
                <input type="password" id="newPassword" name="newPassword" />
              </form>
            </div>
            <div className={styles.save_button}>
              <button type="submit" id="saveChanges">Save Changes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
