import React, { useState, useEffect } from 'react';
import TopBar from "@/components/ui/TopBar";
import AddChannel from "../../components/ui/AddChannel";
import Styles_Home from "./HomePage.module.css";
import SettingsBar from '@/components/ui/SettingsBar';
import { auth, db } from '../../firebase'; // Import your Firebase config
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import avatarImage from '/./avatar.png';
export default function HomePage() {
  const [userData, setUserData] = useState<any[]>([]);
  const [downloadURL, setDownloadURL] = useState<string | null>(null); // State variable for download URL

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
        } else {
          console.log("User data not found.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();

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

  return (
    <div className={Styles_Home.container1_home}>
      <div className={Styles_Home.container1_LeftSide}>
        <TopBar />
        <AddChannel />
        <SettingsBar />
      </div>
      <div className={Styles_Home.container1_MiddleSide}>
        {/* Render user data */}
        <div>
          
        </div>
      </div>
      <div className={Styles_Home.container1_RightSide}>
    
         {/* Display the selected image or default avatar */}
          {userData.length > 0 ? (
            <div>
              {userData[0].profilePictureUrl ? (
                <img
                  src={userData[0].profilePictureUrl}
                  alt="Profile Picture"
                  className={Styles_Home.profile_image}
                />
              ) : (
                <img
                  src={avatarImage}
                  alt="Default Avatar"
                  className={Styles_Home.avatarImage}
                />
              )}
            </div>
          ) : (
            <p>No user data found.</p>
          )}

              {userData.length > 0 && (
            <p className={Styles_Home.displayName}>{userData[0].displayName}</p>
        )}
      </div>
    </div>
  );
}
