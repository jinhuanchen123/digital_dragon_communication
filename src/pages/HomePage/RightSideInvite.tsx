import React, { useState, useEffect } from "react";
import { auth, db } from '../Firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';
import RightSideInvite_Style from './RightSideInvite.module.css';



interface UserData {
  userId: string;
  displayName: string;
  profilePictureUrl: string;
}

type MessageInputProps = {
  channelId: string;
};


export default function RightSide_Invite({ channelId }: MessageInputProps) {
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
        const docRef = doc(db, "text_channels", channelId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const channelData = docSnap.data();
          setTextChannelData(channelData);


          // Fetch user data for each member ID
          const memberIds = channelData.members;
          const membersData = [];
          for (const memberId of memberIds) {
            const userDocRef = doc(db, 'users', memberId);
            const docSnapshot = await getDoc(userDocRef);
            if (docSnapshot.exists()) {
              const userData = docSnapshot.data() as UserData;
              membersData.push(userData);
            }
          }
          setTextChannelData({ ...channelData, membersData });
        } else {
          console.log("Document does not exist.");
        }
      } catch (err) {
        console.error(err);
      }
    };


    fetchDataChannel();
  }, [channelId]);


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
      {textChannelData.membersData && (
        <div className={RightSideInvite_Style.members}>
          {textChannelData.membersData.map((member: UserData) => (
            <div key={member.userId} className={RightSideInvite_Style.member}>  
                <img
                  src={member.profilePictureUrl||userData?.profilePictureUrl}
                  alt="Member Profile Picture"
                  className={RightSideInvite_Style.profile_image}
                />   
              <p>{member.displayName}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
