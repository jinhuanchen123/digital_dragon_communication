import { useState, useEffect } from "react";
import { auth, db } from "../Firebase/firebase";
import { doc, getDoc, updateDoc, arrayRemove } from "firebase/firestore";
import RightSideInvite_Style from "./RightSideInvite.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

interface UserData {
  userId: string;
  displayName: string;
  profilePictureUrl: string;
}

type MessageInputProps = {
  channelId: string;
};

export default function RightSide_Invite({ channelId }: MessageInputProps) {
  const [textChannelData, setTextChannelData] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDataChannel = async () => {
      const user = auth.currentUser;
      if (!user) {
        console.error("User not found.");
        setError("User not found.");
        return;
      }
      try {
        const docRef = doc(db, "text_channels", channelId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const channelData = docSnap.data();
          const memberIds = channelData.members;
          const membersData = [];

          for (const memberId of memberIds) {
            const userDocRef = doc(db, "users", memberId);
            const docSnapshot = await getDoc(userDocRef);
            if (docSnapshot.exists()) {
              const memberData = docSnapshot.data() as UserData;
              membersData.push(memberData);
            }
          }
          setTextChannelData({ ...channelData, membersData });
        } else {
          console.log("Document does not exist.");
        }
      } catch (err) {
        console.error(err);
        setError("Error fetching channel data.");
      } finally {
        setLoading(false);
      }
    };

    fetchDataChannel();
  }, [channelId]);

  

  return (
    <div className={RightSideInvite_Style.container}>
      {textChannelData.membersData && (
        <div className={RightSideInvite_Style.members}>
          {textChannelData.membersData.map((member: UserData) => (
            <div key={member.userId} className={RightSideInvite_Style.member}>
              <img
                src={member.profilePictureUrl}
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
