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
  onSnapshot,
} from "firebase/firestore";
import { FormEvent, useEffect, useState } from "react";
import Home_Styles from "./HomePage.module.css";
import rhea from "../Sound/rhea.mp3";
import '../Sound/Sound';
import { getAuth } from "firebase/auth";

type MessageInputProps = {
  channelId: string;
};

type MuteStatuses = Record<string, string>;

export default function MessageInput({ channelId }: MessageInputProps) {
  const [message, setMessage] = useState("");
  const [channelName, setChannelName] = useState("");
  const [profilePictureUrl, setProfilePictureUrl] = useState<string | null>(
    null
  );
  const [userDisplayName, setUserDisplayName] = useState<string | null>(null);
  const [muteStatus, setMuteStatus] = useState<MuteStatuses>({});

  useEffect(() => {
    async function getChannelName() {
      const auth = getAuth();
      if (!auth.currentUser) {
        console.error("User not found");
        return;
      }
      const userID = auth.currentUser.uid;

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
    async function checkMuteStatus(){
      const docRef = doc(db, 'text_channels', channelId);
      try {
        const docSnap = await getDoc(docRef);
        if(docSnap.exists()){
          const data = docSnap.data();
          setMuteStatus(data.muteStatuses || {});
        } else {
          console.log('Document does not exist');
        }
      } catch (error) {
        console.error('Error getting document:', error);
      }
    }
  
    checkMuteStatus(); // Call the function when the component mounts or when channelId changes
  }, [channelId]); // Include channelId in the dependency array to run the effect when it changes
  

  useEffect(() => {
    if (channelId) {
      const messagesCollectionRef = collection(
        db,
        "text_channels",
        channelId,
        "messages"
      );
      const unsubscribe = onSnapshot(messagesCollectionRef, (snapshot) => {
        const user = auth.currentUser;
        if (!user) return;
        const userID = user.uid;

        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            const messageData = change.doc.data();
            if (messageData.userId !== user.uid && muteStatus[userID] === "unmuted") {
              const audio = new Audio(rhea);
              audio.play();
            }
          }
        });
      });

      return () => unsubscribe();
    }
  }, [channelId, muteStatus]);

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
        sound: rhea,
      });

      setMessage("");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className={Home_Styles.messageInput}>
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
