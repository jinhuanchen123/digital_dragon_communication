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
    onSnapshot 
} from "firebase/firestore";
import { FormEvent, useEffect, useState } from "react";

export default function CheckSoundNotification() {
  const [currentChannelIds, setCurrentChannelIds] = useState<string[]>([]);
  const [selectedSound, setSelectedSound] = useState<string>('');
  const [allUnmuted, setAllUnmuted] = useState<boolean>(false);
  const [newMessageIds, setNewMessageIds]=useState<string[]>([]);

  useEffect(() => {
    const fetchUserSound = async () => {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        console.error("Current user not found.");
        return;
      }

      const userId = currentUser.uid;
      const userRef = doc(db, "users", userId);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        const userSound = userData.soundURL;
        const channelIds = userData.channelIds || [];
        console.log(channelIds)
        setSelectedSound(userSound);
        setCurrentChannelIds(channelIds);
      } else {
        console.error("User document not found.");
      }
    };

    fetchUserSound();
  }, []);


useEffect(() => {
  const fetchMuteStatusesAndListenForMessages = async () => {
    if (!currentChannelIds.length) {
      return;
    }

    const currentUser = auth.currentUser;
    if (!currentUser) {
      console.error("Current user not found.");
      return;
    }

    const userId = currentUser.uid;
    let allChannelsUnmuted = true;

    for (const channelId of currentChannelIds) {
      // Check mute status
      const muteStatusesRef = collection(db, 'text_channels', channelId, "muteStatuses");
      const q = query(muteStatusesRef, where("uid", "==", userId));
      const querySnapshot = await getDocs(q);

      let channelUnmuted = false;

      querySnapshot.forEach((doc) => {
        const status = doc.data().muteStatus;
        if (status === "unmute") {
          channelUnmuted = true;
        }
      });

      // Listen for new messages
      const messageRef = collection(db, 'text_channels', channelId, 'messages');
      const qmessage = query(messageRef, where('userId', '!=', userId));
      const unsubscribe = onSnapshot(qmessage, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === 'added') {
            const messageID = change.doc.id;

            // Check if the message is new or old based on whether it has been heard
            if (channelUnmuted && !newMessageIds.includes(messageID)) {
              // Play sound for new message
              const audio = new Audio(selectedSound);
              audio.play();

              // Add message ID to newMessageIds
              setNewMessageIds((prevIds) => [...prevIds, messageID]);
            } else {
              // It's an old message
              console.log("Old message:", messageID);
            }
          }
        });
      });

      // Clean up on unmount
      return () => unsubscribe();
    }

    setAllUnmuted(allChannelsUnmuted);
  };

  fetchMuteStatusesAndListenForMessages();
}, [currentChannelIds]);



  return (
    <div>
      <p></p>
    </div>
  );
}
