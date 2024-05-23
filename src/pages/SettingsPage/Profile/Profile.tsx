import React, { useState, useRef, useEffect, useContext } from "react";
import RightSidebar from "../SettingLeftSide";
import Profile_styles from "./Profile.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";
import "firebase/storage";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth, db } from "../../../pages/Firebase/firebase.ts"; // Import your Firebase config
import {
  collection,
  getDocs,
  doc,
  setDoc,
  getDoc, 
  updateDoc,
  deleteDoc 
} from "firebase/firestore";
import { ThemeContext } from "../../../contexts/ThemeContext.jsx";

const Profile: React.FC = () => {
  const { toggleTheme, currentTheme, themes } = useContext(ThemeContext);
  const theme = themes[currentTheme];
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [downloadURL, setDownloadURL] = useState<string | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const storage = getStorage();

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const selectedFile = files[0];
      setSelectedFile(selectedFile);

      try {
        const storageRef = ref(storage, `avatars/${selectedFile.name}`);
        await uploadBytes(storageRef, selectedFile);
        const downloadURL = await getDownloadURL(storageRef);
        setDownloadURL(downloadURL);

        const currentUser = auth.currentUser;
        if (!currentUser) {
          console.error("Current user not found.");
          return;
        }
        const userId = currentUser.uid;
        const userDocRef = doc(db, 'users', userId);
        await updateDoc(userDocRef, { profilePictureUrl: downloadURL });

        const updatedUserData = { ...userData, profilePictureUrl: downloadURL };
        setUserData(updatedUserData);
        localStorage.setItem('userData', JSON.stringify(updatedUserData));
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  const handleEditProfileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleRedictMainPage = () => {
    navigate("/"); // Redirect to the main page
  };

  const handleSaveUsername = async () => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        console.error("Current user not found.");
        return;
      }
      const userId = currentUser.uid;
      const userDocRef = doc(db, 'users', userId);
      await updateDoc(userDocRef, { displayName: newUsername });

      const updatedUserData = { ...userData, displayName: newUsername };
      setUserData(updatedUserData);
      localStorage.setItem('userData', JSON.stringify(updatedUserData));
      setIsEditingUsername(false);
    } catch (error) {
      console.error('Error updating displayName:', error);
    }
  };

  const handleSaveEmail = async () => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        console.error("Current user not found.");
        return;
      }
      const userId = currentUser.uid;
      const userDocRef = doc(db, 'users', userId);
      await updateDoc(userDocRef, { email: newEmail });

      const updatedUserData = { ...userData, email: newEmail };
      setUserData(updatedUserData);
      localStorage.setItem('userData', JSON.stringify(updatedUserData));
      setIsEditingEmail(false);
    } catch (error) {
      console.error('Error updating email:', error);
    }
  };

  const checkDownloadURL = async () => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        console.error("Current user not found.");
        return;
      }
      const userId = currentUser.uid;
      const userDocRef = doc(db, 'users', userId);
      const docSnapshot = await getDoc(userDocRef);
      if (docSnapshot.exists()) {
        const userData = docSnapshot.data();
        const profilePictureUrl = userData?.profilePictureUrl;
        if (!profilePictureUrl) {
          await updateDoc(userDocRef, {
            profilePictureUrl: "https://winaero.com/blog/wp-content/uploads/2015/05/windows-10-user-account-login-icon.png"
          });
          console.log('Profile picture updated with default avatar.');
        } else {
          console.log('Profile picture already exists.');
        }
      } else {
        console.error("User document not found.");
      }
    } catch (error) {
      console.error('Error updating profile picture:', error);
    }
  };

  const fetchUserData = async () => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        console.error("Current user not found.");
        return;
      }
      const userId = currentUser.uid;
      const userDocRef = doc(db, 'users', userId);
      const docSnapshot = await getDoc(userDocRef);
      if (docSnapshot.exists()) {
        const fetchedUserData = docSnapshot.data();
        setUserData(fetchedUserData);
        localStorage.setItem('userData', JSON.stringify(fetchedUserData));
      } else {
        console.log("User data not found.");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    if (auth.currentUser) {
      fetchUserData();
      checkDownloadURL();
    }
  }, []);

  const handleDeleteAccount = async () => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        console.error("Current user not found.");
        return;
      }
      const userId = currentUser.uid;
      await deleteDoc(doc(db, 'users', userId));
      await currentUser.delete();
      console.log('User account deleted successfully.');
      localStorage.removeItem('userData');
      navigate('/login');
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };

  return (
    <div className={Profile_styles.container1_profile}>
      <RightSidebar />
      <div className={Profile_styles.profile_section}>
        <div
          className={Profile_styles.header}
          style={{ background: theme.bgd }}
        >
          <h1 className={Profile_styles.header1}>Profile</h1>
        </div>
        <div className={Profile_styles.icon_container} style={{ float: 'right' }}>
          <FontAwesomeIcon
            icon={faTimesCircle}
            className={`${Profile_styles.customIconStyle} ${Profile_styles.smallIcon}`}
            onClick={handleRedictMainPage}
          />
        </div>
        <div className={Profile_styles.big_card}>
          <div className={Profile_styles.card}>
            <div
              className={Profile_styles.avatar}
              style={{ background: theme.bgd }}
            >
              {/* Custom button to trigger file input */}
              <button className={Profile_styles.editButton} onClick={handleEditProfileClick}>
                Edit Profile
              </button>
              {/* Hidden file input */}
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileSelect}
                className={Profile_styles.hiddenInput}
              />
              <img
                src={downloadURL || userData?.profilePictureUrl || "https://winaero.com/blog/wp-content/uploads/2015/05/windows-10-user-account-login-icon.png"}
                alt="Profile Picture"
                className={Profile_styles.profile_image}
              />
            </div>
            <form className={Profile_styles.info}>
              {userData ? (
                <div key={userData.id}>
                  <div className={Profile_styles.username_container}>
                    <p className={Profile_styles.username}>
                      Username: 
                      {isEditingUsername ? (
                        <>
                          <input
                            type="text"
                            className={Profile_styles.inputField}
                            value={newUsername}
                            onChange={(e) => setNewUsername(e.target.value)}
                          />
                          <button
                            className={Profile_styles.saveButton}
                            type="button"
                            onClick={handleSaveUsername}
                          >
                            Save
                          </button>
                        </>
                      ) : (
                        userData.displayName
                      )}
                    </p>
                    <button
                      className={Profile_styles.username_edit}
                      type="button"
                      onClick={() => setIsEditingUsername(true)}
                    >
                      Edit
                    </button>
                  </div>
                  <div className={Profile_styles.email_container}>
                    <p className={Profile_styles.email}>
                      Email: 
                      {isEditingEmail ? (
                        <>
                          <input
                            type="text"
                            className={Profile_styles.inputField}
                            value={newEmail}
                            onChange={(e) => setNewEmail(e.target.value)}
                          />
                          <button
                            className={Profile_styles.saveButton}
                            type="button"
                            onClick={handleSaveEmail}
                          >
                            Save
                          </button>
                        </>
                      ) : (
                        userData.email
                      )}
                    </p>
                    <button
                      className={Profile_styles.email_edit}
                      type="button"
                      onClick={() => setIsEditingEmail(true)}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ) : (
                <p>No user data found.</p>
              )}
            </form>
          </div>
          <div className={Profile_styles.deleteAccount_container}>
            <button className={Profile_styles.deleteAccount} onClick={handleDeleteAccount}>
              <span>Delete Account</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
