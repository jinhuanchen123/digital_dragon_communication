import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { db, auth } from "../Firebase/firebase";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";
import { FormEvent, useEffect, useState } from "react";
import Home_Styles from "./HomePage.module.css";

type MessageInputProps = {
  channelId: string;
};

export default function MessageInput({ channelId }: MessageInputProps) {
  const [message, setMessage] = useState("");
  const [channelName, setChannelName] = useState("");

  useEffect(() => {
    async function getChannelName() {
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

  async function handleSendMessage(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!message.trim()) return; // Avoid sending empty messages

    const user = auth.currentUser;
    console.log(user);
    if (!user) {
      console.error("user not found");
      return;
    }

    try {
      await addDoc(collection(db, "text_channels", channelId, "messages"), {
        text: message,
        createdAt: serverTimestamp(),
        username: user.displayName,
        userId: user.uid,
        userPhoto: user.photoURL,
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
