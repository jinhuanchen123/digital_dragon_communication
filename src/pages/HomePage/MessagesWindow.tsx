import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../Firebase/firebase";
import { useEffect, useState } from "react";

type Message = {
  id: string;
  text: string;
  createdAt: {
    seconds: number;
  };
  username: string;
  userId: string;
  userPhoto: string;
};

type MessagesWindowProps = {
  channelId: string;
};

export default function MessagesWindow({ channelId }: MessagesWindowProps) {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (!channelId) return;

    const messagesRef = collection(db, "text_channels", channelId, "messages");
    const q = query(messagesRef, orderBy("createdAt"));

    const unsubscribe = onSnapshot(q, async (snapshot) => {
      const messagesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Message[];

      setMessages(messagesData);
    });

    return () => unsubscribe();
  }, [channelId]);

  return (
    <div>
      {messages.map((message) => (
        <div key={message.id} className="m-4 flex bg-zinc-300 p-4 gap-2 rounded">
          <img
            className="h-[32px] w-[32px] "
            src={message.userPhoto}
            width="32"
            height="32"
          />
          <div>
            <p>
              <strong className="mr-4">{message.username}</strong>
              <small>
                {message.createdAt &&
                  new Date(message.createdAt.seconds * 1000).toLocaleString()}
              </small>
            </p>
            <p>{message.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
