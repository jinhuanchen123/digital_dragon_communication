import React, { useState, useEffect } from "react";
import { auth, db } from '../Firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';
import RightSideInvite_Style from './RightSideInvite.module.css';
import avatarImage from '/./avatar.png';

interface UserData {
  displayName: string;
  profilePictureUrl:string;
  
}

export default function RightSide_Invite() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [textChannelData, setTextChannelData] = useState<any>({});
 


  useEffect(() => {
    const fetchDataChannel = async () => {
      const user = auth.currentUser;
      if (!user) {
        console.error("User not found.");
        return;
      }

      try {
        const docRef = doc(db, "text_channels", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
          setTextChannelData(docSnap.data()); // Update the state with fetched data
        } else {
          console.log("Document does not exist.");
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchDataChannel();
  }, []); // Empty dependency array to run the effect only once when the component mounts
  

  useEffect(() => {
    const fetchDataUser = async () => {
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
          setUserData(docSnapshot.data() as UserData);
          localStorage.setItem('userData', JSON.stringify(docSnapshot.data()));
        } else {
          console.log("User data not found.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchDataUser();
  }, []);

  return (
    <div className={RightSideInvite_Style.container}>
      {userData && (
        <div className={RightSideInvite_Style.friend}>
          
          {userData.profilePictureUrl ? (
            <img
              src={userData.profilePictureUrl}
              alt="Profile Picture"
              className={RightSideInvite_Style.profile_image}
            />
          ) : (
            <img
              src={avatarImage}
              alt="Default Avatar"
              className={RightSideInvite_Style.avatarImage}
            />
          )}
          <p>{userData.displayName}</p>
        </div>
      )}
    </div>
  );
}


