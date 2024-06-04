import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { db, auth } from "../Firebase/firebase";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  updateDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { FormEvent, useEffect, useState } from "react";
import rhea from "../Sound/rhea.mp3";
import '../Sound/Sound';
import { getAuth } from "firebase/auth";

type MessageInputProps = {
  channelId: string;
};


// function showNotification() {
//   const notification = new Notification("New Message", {
//     body: "Hey, ydhjdhja"
//   });
// }

// // Check if the browser supports notifications
// if ("Notification" in window) {
//   // Trigger notification
//   if (Notification.permission === "granted") {
//     showNotification();
//   } else if (Notification.permission !== "denied") {
//     Notification.requestPermission().then(permission => {
//       if (permission === "granted") {
//         showNotification();
//       } else {
//         console.log("Notification permission denied");
//       }
//     }).catch(error => {
//       console.error("Notification permission request error:", error);
//     });
//   } else {
//     console.log("Notification permission denied previously");
//   }
// } else {
//   console.log("This browser does not support desktop notification");
// }


export default function MessageInput({ channelId }: MessageInputProps) {
  const [message, setMessage] = useState("");
  const [channelName, setChannelName] = useState("");
  const [profilePictureUrl, setProfilePictureUrl] = useState<string | null>(null);
  const [userDisplayName, setUserDisplayName] = useState<string | null>(null);
  const [muteStatus, setMuteStatus] = useState("");
  const [soundURL, setSoundURL] = useState(rhea); // Default sound URL
  const [muteStatusID, setMuteStatusID] = useState("");

  useEffect(() => {
    console.log("Props received:", { channelId }); // Log received props

    async function getChannelName() {
      const auth = getAuth();
      if (!auth.currentUser) {
        console.error("User not found");
        return;
      }

      if (channelId) {
        const docRef = doc(db, "text_channels", channelId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setChannelName(data.channelName);
        }
      }
    }

    getChannelName();
  }, [channelId]);

  useEffect(() => {
    async function fetchUserData() {
      const user = auth.currentUser;
      if (!user) {
        console.error("User not found");
        return;
      }
      const userDocRef = doc(db, "users", user.uid);
      const docSnapshot = await getDoc(userDocRef);
      if (docSnapshot.exists()) {
        const userData = docSnapshot.data();
        setProfilePictureUrl(userData.profilePictureUrl);
        setUserDisplayName(userData.displayName);
      }
    }

    fetchUserData();
  }, []);

  useEffect(() => {
    async function getMuteStatusesId() {
      try {
        const muteStatusesRef = collection(db, "text_channels", channelId, "muteStatuses");
        const querySnapshot = await getDocs(muteStatusesRef);
        querySnapshot.forEach((doc) => {
          console.log("Mute Statuses ID:", doc.id);
          setMuteStatusID(doc.id);
        });
      } catch (error) {
        console.error("Error getting mute statuses:", error);
      }
    }

    if (channelId) {
      getMuteStatusesId();
    }
  }, [channelId]);


  async function handleSendMessage(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!message.trim()) return; // Avoid sending empty messages

    const user = auth.currentUser;
    if (!user) {
      console.error("User not found");
      return;
    }

    try {
      // Update previous messages' profile picture and username if they have changed
      const messagesQuery = query(
        collection(db, "text_channels", channelId, "messages"),
        where("userId", "==", user.uid)
      );

      const querySnapshot = await getDocs(messagesQuery);
      querySnapshot.forEach(async (messageDoc) => {
        const messageData = messageDoc.data();
        if (
          messageData.username !== userDisplayName ||
          messageData.userPhoto !== profilePictureUrl
        ) {
          await updateDoc(messageDoc.ref, {
            username: userDisplayName,
            userPhoto: profilePictureUrl,
          });
        }
      });

      // Add the new message
      await addDoc(collection(db, "text_channels", channelId, "messages"), {
        text: message,
        createdAt: serverTimestamp(),
        username: userDisplayName,
        userId: user.uid,
        userPhoto: profilePictureUrl,
      });

      setMessage("");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSendMessage}>
        <Input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={`Message ${channelName}`}
        />
        <Button style={{ display: "none" }}></Button>
      </form>
    </div>
  );
}
