import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  deleteDoc,
  getDoc,
} from "firebase/firestore";
import { db, auth } from "../Firebase/firebase";
import { useEffect, useRef, useState } from "react";
import HomeStyles from "./HomePage.module.css";

type Message = {
  id: string;
  text: string;
  createdAt: {
    seconds: number;
  };
  userId: string;
};

type UserData = {
  profilePictureUrl: string;
  displayName: string;
};

type MessagesWindowProps = {
  channelId: string;
};

export default function MessagesWindow({ channelId }: MessagesWindowProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [usersData, setUsersData] = useState<Record<string, UserData>>({});
  const dummy = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!channelId) return;

    const messagesRef = collection(db, "text_channels", channelId, "messages");
    const q = query(messagesRef, orderBy("createdAt"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messagesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Message[];

      setMessages(messagesData);
    });

    return () => unsubscribe();
  }, [channelId]);

  useEffect(() => {
    if (dummy.current) {
      dummy.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    const fetchUserData = async (userId: string) => {
      if (usersData[userId]) {
        return;
      }

      try {
        const userDocRef = doc(db, 'users', userId);
        const docSnapshot = await getDoc(userDocRef);
        if (docSnapshot.exists()) {
          const fetchedUserData = docSnapshot.data() as UserData;
          setUsersData(prevData => ({ ...prevData, [userId]: fetchedUserData }));
        } else {
          console.log("User data not found.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    messages.forEach(message => {
      fetchUserData(message.userId);
    });
  }, [messages, usersData]);

  const handleMouseOver = (messageID: string) => {
    const buttonEle = document.getElementById(`${messageID}button`);
    if (buttonEle) {
      buttonEle.style.fontWeight = "900";
      buttonEle.style.color = "#e5e7eb";
      buttonEle.style.backgroundColor = "#512da8";
    }
  };

  const handleMouseOut = (messageID: string) => {
    const buttonEle = document.getElementById(`${messageID}button`);
    if (buttonEle) {
      buttonEle.style.fontWeight = "500";
      buttonEle.style.backgroundColor = "rgba(0,0,0,0)";
      buttonEle.style.color = "#512da8";
    }
  };

  const handleDeleteClick = async (messageID: string) => {
    await deleteDoc(doc(db, "text_channels", channelId, "messages", messageID));
  };

  return (
    <div className={HomeStyles.messageWindow}>
      {messages.slice().reverse().map((message) => {
        const messageUserData = usersData[message.userId];
        return (
          <div
            key={message.id}
            id={message.id}
            className={`m-4 flex gap-2 rounded bg-zinc-300 p-4 ${HomeStyles.message}`}
          >
            {messageUserData && (
              <img
                className="h-[32px] w-[32px] rounded-full"
                src={messageUserData.profilePictureUrl }
                width="32"
                height="32"
                alt="User Profile"
              />
            )}
            <div className={HomeStyles.messageContent}>
              <div className={HomeStyles.messageTitle}>
                <div>
                  {messageUserData && (
                    <strong className="mr-4">{messageUserData.displayName}</strong>
                  )}
                  <small>
                    {message.createdAt &&
                      new Date(message.createdAt.seconds * 1000).toLocaleString()}
                  </small>
                </div>
                {auth.currentUser?.uid === message.userId && (
                  <button
                    id={`${message.id}button`}
                    onMouseOut={() => handleMouseOut(message.id)}
                    onMouseOver={() => handleMouseOver(message.id)}
                    onClick={() => handleDeleteClick(message.id)}
                    className={HomeStyles.deleteBtn}
                  >
                    delete
                  </button>
                )}
              </div>
              <p>{message.text}</p>
            </div>
          </div>
        );
      })}
     
    </div>
  );
}
