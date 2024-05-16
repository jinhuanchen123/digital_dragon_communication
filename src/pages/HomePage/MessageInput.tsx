import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { db, auth } from "../Firebase/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import Home_Styles from "./HomePage.module.css";


type MessageInputProps = {
  channelId: string;
};

export default function MessageInput({ channelId }: MessageInputProps) {
  const [message, setMessage] = useState("");

  async function handleSendMessage() {
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
      <Input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message here..."
      />
      <Button onClick={handleSendMessage}>Send</Button>
    </div>
  );
}
