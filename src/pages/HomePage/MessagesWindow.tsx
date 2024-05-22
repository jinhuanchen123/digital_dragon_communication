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

type MessagesWindowProps = {
  channelId: string;
};

type UserData = {
  profilePictureUrl: string;
  displayName:string;
};

export default function MessagesWindow({ channelId }: MessagesWindowProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userData, setUserData] = useState<UserData | null>(null);
  const dummy = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (!user) {
        console.error("User not found.");
        return;
      }

      try {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data() as UserData;
          setUserData(data);
        } else {
          console.log("Document does not exist.");
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchUserData();
  }, []);

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

  const btnOver = (messageID: string) => {
    const buttonEle = document.getElementById(`${messageID}button`);
    if (buttonEle) {
      buttonEle.style.fontWeight = "900";
      buttonEle.style.color = "#e5e7eb";
      buttonEle.style.backgroundColor = "#512da8";
    }
  };

  const btnOut = (messageID: string) => {
    const buttonEle = document.getElementById(`${messageID}button`);
    if (buttonEle) {
      buttonEle.style.fontWeight = "500";
      buttonEle.style.backgroundColor = "rgba(0,0,0,0)";
      buttonEle.style.color = "#512da8";
    }
  };

  const btnClicked = async (messageID: string) => {
    await deleteDoc(doc(db, "text_channels", channelId, "messages", messageID));
  };

  return (
    <div className={HomeStyles.messageWindow}>
      {messages.map((message) => (
        <div
          key={message.id}
          id={message.id}
          className={`m-4 flex gap-2 rounded bg-zinc-300 p-4 ${HomeStyles.message}`}
        >
          {userData && (
            <img
              className="h-[32px] w-[32px]"
              src={userData.profilePictureUrl}
              width="32"
              height="32"
              alt="User Profile"
            />
          )}

        
          <div className={HomeStyles.messageContent}>
            <div className={HomeStyles.messageTitle}>
              <div>
              {userData && (
                <strong className="mr-4">{userData.displayName}</strong>
              )}
                <small>
                  {message.createdAt &&
                    new Date(message.createdAt.seconds * 1000).toLocaleString()}
                </small>
              </div>
              {auth.currentUser?.uid === message.userId && (
                <button
                  id={`${message.id}button`}
                  onMouseOut={() => btnOut(message.id)}
                  onMouseOver={() => btnOver(message.id)}
                  onClick={() => btnClicked(message.id)}
                  className={HomeStyles.deleteBtn}
                >
                  delete
                </button>
              )}
            </div>
            <p>{message.text}</p>
          </div>
        </div>
      ))}
      <div ref={dummy}></div>
    </div>
  );
}
