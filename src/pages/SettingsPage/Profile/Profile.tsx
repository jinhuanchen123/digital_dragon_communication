import React, { useState, useRef, useEffect, useContext} from 'react';
import RightSidebar from '../SettingLeftSide';
import Profile_styles from './Profile.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";
import avatarImage from '/./avatar.png'; // Import your default avatar image
import "firebase/storage";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth ,db} from '../../../firebase'; // Import your Firebase config
import { Firestore, getFirestore, collection, getDocs,doc, setDoc, } from "firebase/firestore";
import { ThemeContext } from "../../../contexts/ThemeContext.jsx" 

function Profile() {

  const { toggleTheme, currentTheme, themes } = useContext(ThemeContext);
  const theme = themes[currentTheme];

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [downloadURL, setDownloadURL] = useState<string | null>(null);
  const [userData, setUserData] = useState<any[]>([]);
  //const [userData, setUserData] = useState<string | null>(null); // State variable to store user data
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

        // Upload file to Firebase Storage
        const snapshot = await uploadBytes(storageRef, selectedFile);
        console.log("File uploaded successfully!");

        // Get download URL
        const downloadURL = await getDownloadURL(storageRef);
        console.log("Download URL:", downloadURL);

        // Set the download URL to state
        setDownloadURL(downloadURL);

        // // Update user profile with the download URL (assuming user ID is available)
        // if (currentUser) {
        //   await updateProfileWithDownloadURL(currentUser.uid, downloadURL);
        // }

        const currentUser = auth.currentUser;
        if (!currentUser) {
        console.error("Current user not found.");
        return;
        }
        const userId = currentUser.uid;

        // Reference the 'users' collection and the current user's document
        const userDocRef = doc(db, 'users', userId);
        await setDoc(userDocRef, { profilePictureUrl: downloadURL });
        
        const path=`avatars/${selectedFile.name}`
        // const usersCollection = collection(db, 'users');
        // const userDoc = doc(usersCollection); // This creates a new document with a generated ID
        // const data = { url: path }; // Assuming downloadURL is defined elsewhere
        // await setDoc(userDoc, data);

        // Save the download URL in local storage
        localStorage.setItem("downloadURL", downloadURL);
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

  useEffect(() => {
    // Check if downloadURL exists in local storage and update state
    const storedDownloadURL = localStorage.getItem("downloadURL");
    if (storedDownloadURL) {
      setDownloadURL(storedDownloadURL);
    }
  }, []);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersCollection = collection(db, 'users');
        const querySnapshot = await getDocs(usersCollection);
        const userDataArray: any[] = [];
        querySnapshot.forEach((doc) => {
          userDataArray.push({ id: doc.id, ...doc.data() });
        });
        setUserData(userDataArray);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={Profile_styles.container1_profile}>
      <RightSidebar />
      <div className={Profile_styles.profile_section}>
        <div className={Profile_styles.header} style={{background: theme.bgd}}>
          <h1 className={Profile_styles.header1}>Profile</h1>
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
            <div className={Profile_styles.avatar} style={{background: theme.bgd}}>
              {/* Custom button to trigger file input */}
              <button className={Profile_styles.editButton} onClick={handleEditProfileClick}>
                Edit Profile
              </button>
              {/* Hidden file input */}
              <input
                type="file"
                accept=".jpg"
                ref={fileInputRef}
                onChange={handleFileSelect}
                className={Profile_styles.hiddenInput}
              />
              {/* Display the selected image or default avatar */}
              {downloadURL ? (
                <div>
                  <img
                    src={downloadURL}
                    alt="Downloaded Image"
                    className={Profile_styles.profile_image}
                  />
                </div>
              ) : (
                <img
                  src={avatarImage}
                  alt="Default Avatar"
                  className={Profile_styles.avatarImage}
                />
              )}
            </div>
            {/* Rest of your profile content */}
            <div className={Profile_styles.ProfileForm}>
            <form className={Profile_styles.info}>
            {userData && userData.length > 0 ? (
              <div key={userData[0].id}>
                <p>Username: {userData[0].displayName}</p>
                
                <p>Email:{userData[0].email}</p>
                {/* Add other user data fields as needed */}
              </div>
            ) : (
              <p>No user data found.</p>
            )}
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
