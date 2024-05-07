// Inside your Profile component
import React, { useState, useRef } from 'react';
import RightSidebar from '../SettingLeftSide';
import Profile_styles from './Profile.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from 'react-router-dom';
import avatarImage from '/./avatar.png';
import { collection, doc, getDoc} from "firebase/firestore"; 

function Profile() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [defaultAvatar, setDefaultAvatar] = useState(true)
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
      setDefaultAvatar(false)
    }
  };

  const handleEditProfileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); 
    }



  };
  const handleEditUsername=()=>{
    


  }
 
  const navigate = useNavigate();

  const handleRedictMainPage = () => {
  navigate("/"); // Redirect to the main page
};


  return (
    <div className={Profile_styles.container1_profile}>
      <RightSidebar />
      <div className={Profile_styles.profile_section}>
        <div className={Profile_styles.header}>
          <h1>Profile</h1>
        </div>
        <div className={Profile_styles.icon_container}>
          <FontAwesomeIcon
                icon={faTimesCircle}
                className={Profile_styles.customIconStyle}
                onClick={handleRedictMainPage}
            />
        </div>

        <div className={Profile_styles.big_card}>
          <div className={Profile_styles.card}>
            <div className={Profile_styles.avatar}>
              
              {/* Custom button to trigger file input */}
              <button className={Profile_styles.editButton} onClick={handleEditProfileClick}>
                Edit Profile
              </button>
              {/* Hidden file input */}
              <input
                type="file"
                accept=".jpg,.jpeg,.png"
                ref={fileInputRef}
                onChange={handleFileSelect}
                className={Profile_styles.hiddenInput}
              />
              {/* Original Image */}
              {defaultAvatar&&(
                 <img src={avatarImage} alt="Avatar Image" className={Profile_styles.avatarImage} />

              )}
              {/* Display the selected image */}
              {selectedFile && (
                <div>
                  <img
                    src={URL.createObjectURL(selectedFile)}
                    alt="Selected Image"
                    className={Profile_styles.profile_image}
                  />

                </div>
              )}
            </div>
            {/* Rest of your profile content */}
            <div className={Profile_styles.ProfileForm}>
              <form className={Profile_styles.info}>
                <label htmlFor="username">Username:</label>
                <button type="button" onClick={handleEditUsername}>Edit</button>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" />
                
              </form>
            </div>
            <div className={Profile_styles.save_button}>
              <button type="submit" id="saveChanges">Save Changes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
