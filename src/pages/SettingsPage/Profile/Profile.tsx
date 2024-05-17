<<<<<<< HEAD
import React, { useState, useRef, useEffect, useId } from 'react';
=======
import React, { useState, useRef, useEffect, useContext} from 'react';
>>>>>>> origin/Setting
import RightSidebar from '../SettingLeftSide';
import Profile_styles from './Profile.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";
import avatarImage from '/./avatar.png'; // Import your default avatar image
import "firebase/storage";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
<<<<<<< HEAD
import { auth ,db} from '../../Firebase/firebase'; // Import your Firebase config
import { Firestore, getFirestore, collection, getDocs,doc, setDoc, deleteDoc,updateDoc, deleteField,getDoc} from "firebase/firestore";

export default function  Profile() {
=======
import { auth ,db} from '../../../firebase'; // Import your Firebase config
import { Firestore, getFirestore, collection, getDocs,doc, setDoc, } from "firebase/firestore";
import { ThemeContext } from "../../../contexts/ThemeContext.jsx" 

function Profile() {

  const { toggleTheme, currentTheme, themes } = useContext(ThemeContext);
  const theme = themes[currentTheme];

>>>>>>> origin/Setting
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

<<<<<<< HEAD
    
=======
        // // Update user profile with the download URL (assuming user ID is available)
        // if (currentUser) {
        //   await updateProfileWithDownloadURL(currentUser.uid, downloadURL);
        // }

>>>>>>> origin/Setting
        const currentUser = auth.currentUser;
        if (!currentUser) {
        console.error("Current user not found.");
        return;
        }
        const userId = currentUser.uid;

        // Reference the 'users' collection and the current user's document
        const userDocRef = doc(db, 'users', userId);
<<<<<<< HEAD
        await updateDoc(userDocRef, { profilePictureUrl: downloadURL });
=======
        await setDoc(userDocRef, { profilePictureUrl: downloadURL });
>>>>>>> origin/Setting
        
        const path=`avatars/${selectedFile.name}`
        // const usersCollection = collection(db, 'users');
        // const userDoc = doc(usersCollection); // This creates a new document with a generated ID
        // const data = { url: path }; // Assuming downloadURL is defined elsewhere
        // await setDoc(userDoc, data);

        // Save the download URL in local storage
<<<<<<< HEAD
        // localStorage.setItem("downloadURL", downloadURL);
=======
        localStorage.setItem("downloadURL", downloadURL);
>>>>>>> origin/Setting
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };


  const handleEditProfileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); 
<<<<<<< HEAD
    }
  };

  const handleRedictMainPage = () => {
    navigate("/"); // Redirect to the main page
  };


  const updateDisplayName = async () => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        console.error("Current user not found.");
        return;
      }
      const userId = currentUser.uid;
  
      const userDocRef = doc(db, 'users', userId);
      
      // Remove the 'displayName' field from the document
      await updateDoc(userDocRef, {
        displayName: "",
      });
  
      console.log('DisplayName field deleted successfully.');
    } catch (error) {
      console.error('Error deleting displayName field:', error);
    }
  };

  const updateEmail= async () => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        console.error("Current user not found.");
        return;
      }
      const userId = currentUser.uid;
  
      const userDocRef = doc(db, 'users', userId);
      
      // Remove the 'displayName' field from the document
      await updateDoc(userDocRef, {
        email: "",
      });
  
      console.log('email field deleted successfully.');
    } catch (error) {
      console.error('Error update email field:', error);
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

    // Check if profilePictureUrl exists in the database
    const docSnapshot = await getDoc(userDocRef);
    if (docSnapshot.exists()) {
      const userData = docSnapshot.data();
      const profilePictureUrl = userData.profilePictureUrl;

      // Check if profilePictureUrl is empty or null
      if (!profilePictureUrl) {
        // Set default avatar image URL
        await updateDoc(userDocRef, {
          profilePictureUrl: "/path/to/default/avatar"
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
checkDownloadURL()

useEffect(() => {
  const fetchData = async () => {
      try {
          // Fetch user data from Firestore
          const currentUser = auth.currentUser;
          if (!currentUser) {
              console.error("Current user not found.");
              return;
          }
          const userId = currentUser.uid;
          const userDocRef = doc(db, 'users', userId);
          const docSnapshot = await getDoc(userDocRef);
          if (docSnapshot.exists()) {
              setUserData([docSnapshot.data()]);
              // Store user data in local storage
              localStorage.setItem('userData', JSON.stringify(docSnapshot.data()));
          } else {
              console.log("User data not found.");
          }
      } catch (error) {
          console.error("Error fetching user data:", error);
      }
  };
  fetchData();
}, []);

  



const handleDeleteAccount = async (id: string) => {
  const currentUser = auth.currentUser;
    if (!currentUser) {
      console.error("Current user not found.");
      return;
    }
    const userId = currentUser.uid;
=======
    }
  };

  const handleRedictMainPage = () => {
    navigate("/"); // Redirect to the main page
  };
>>>>>>> origin/Setting

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

  try {
    // Delete the document with the specified ID from the 'users' collection
    await deleteDoc(doc(db, 'users',  userId));

    // Delete the user account from Firebase Authentication
    const currentUser = auth.currentUser;
    if (currentUser) {
      await currentUser.delete();
      console.log('User account deleted successfully.');
    } else {
      console.error('Current user not found.');
    }

    console.log('Document deleted successfully.');
  } catch (error) {
    console.error('Error deleting document:', error);
  }
   navigate('/login'); // Navigate first
};
  
  
  
  return (
    <div className={Profile_styles.container1_profile}>
      <RightSidebar />
      <div className={Profile_styles.profile_section}>
<<<<<<< HEAD
        <div className={Profile_styles.header}>
=======
        <div className={Profile_styles.header} style={{background: theme.bgd}}>
>>>>>>> origin/Setting
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
<<<<<<< HEAD
            <div className={Profile_styles.avatar}>
=======
            <div className={Profile_styles.avatar} style={{background: theme.bgd}}>
>>>>>>> origin/Setting
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
<<<<<<< HEAD
              {/* Display the selected image or default avatar */}
              {userData.length > 0 ? (
                <div>
                  {userData[0].profilePictureUrl ? (
                    <img
                      src={userData[0].profilePictureUrl}
                      alt="Profile Picture"
                      className={Profile_styles.profile_image}
                    />
                  ) : (
                    <img
                      src={avatarImage}
                      alt="Default Avatar"
                      className={Profile_styles.avatarImage}
                    />
                  )}
                </div>
              ) : (
                <p>No user data found.</p>
=======
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
>>>>>>> origin/Setting
              )}

            </div>
            
            
            <div className={Profile_styles.ProfileForm}>
            <form className={Profile_styles.info}>
            {userData && userData.length > 0 ? (
              <div key={userData[0].id}>
<<<<<<< HEAD
                <div className={Profile_styles.username_container} >
              
                    <p className={Profile_styles.username} >Username: {userData[0].displayName}</p>
                    <button className={Profile_styles.username_edit } onClick={updateDisplayName}>Edit</button>
                </div>
                <div className={Profile_styles.email_container}>
                    <p className={Profile_styles.email}>Email: {userData[0].email}</p>
                    <button className={Profile_styles.email_edit}  onClick={updateEmail}>Edit</button>
                </div>
                
=======
                <p>Username: {userData[0].displayName}</p>
                
                <p>Email:{userData[0].email}</p>
>>>>>>> origin/Setting
                {/* Add other user data fields as needed */}
              </div>
            ) : (
              <p>No user data found.</p>
            )}
            </form>
          


            </div>


            {/* <div className={Profile_styles.save_button}>
              <button type="submit" id="saveChanges">Save Changes</button>
            </div> */}
         
          </div>
          <div className={Profile_styles.deleteAccount_container}>
            <button className={Profile_styles.deleteAccount} onClick={()=>handleDeleteAccount(userData.id)}><span>Delete Account</span></button>
          
          </div>
          
        </div>
      </div>
    </div>
  );
 
}


