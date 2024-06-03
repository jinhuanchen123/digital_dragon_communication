import React, { useEffect, useRef, useState } from "react";
import { collection, doc, onSnapshot, orderBy, query, deleteDoc, getDoc, setDoc } from "firebase/firestore";
import { db, auth } from "../Firebase/firebase";
import HomeStyles from "./HomePage.module.css";

type Message = {
  id: string;
  text: string;
  createdAt: {
    seconds: number;
  };
  userId: string;
  username: string;
  userPhoto: string;
  online: boolean;
};

type MessagesWindowProps = {
  channelId: string;
};

type UserData = {
  profilePictureUrl: string;
  displayName: string;
  online: boolean;
};

export default function MessagesWindow({ channelId }: MessagesWindowProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [userOnlineStatus, setUserOnlineStatus] = useState<{ [userId: string]: boolean }>({});
  const dummy = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (!user) {
        console.error("User not found.");
        return;
      }

      try {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data() as UserData;
          setUserData(data);
          // Update online status to true in Firestore
          await setDoc(docRef, { ...data, online: true }); // Update the document with the online field set to true
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

      setMessages(messagesData.reverse());
    });

    return () => unsubscribe();
  }, [channelId]);

  useEffect(() => {
    if (messages.length === 0) return;

    const userIds = messages.map((message) => message.userId);

    const fetchUserOnlineStatus = async () => {
      const userOnlineStatusPromises = userIds.map(async (userId) => {
        try {
          const docRef = doc(db, "users", userId);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const userData = docSnap.data() as UserData;
            return { userId, online: userData.online };
          } else {
            return { userId, online: false };
          }
        } catch (err) {
          console.error(err);
          return { userId, online: false };
        }
      });

      const userOnlineStatusResults = await Promise.all(userOnlineStatusPromises);
      const updatedUserOnlineStatus: { [userId: string]: boolean } = {};
      userOnlineStatusResults.forEach((result) => {
        updatedUserOnlineStatus[result.userId] = result.online;
      });
      setUserOnlineStatus(updatedUserOnlineStatus);
    };

    fetchUserOnlineStatus();
  }, [messages]);

  useEffect(() => {
    dummy.current && dummy.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const isBlocked = async (userId: string) => {
    if (!auth.currentUser) return false; // Not signed in
  
    try {
      const currentUserDocRef = doc(db, "users", auth.currentUser.uid);
      const currentUserDocSnap = await getDoc(currentUserDocRef);
      if (!currentUserDocSnap.exists()) {
        console.error("Current user document not found.");
        return false;
      }
  
      const blockedList = currentUserDocSnap.data()?.blockedList;
      if (!blockedList) {
        console.error("Blocked list not found in current user document.");
        return false;
      }
  
      return blockedList.includes(userId);
    } catch (err) {
      console.error(err);
      return false;
    }
  };

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
      <div ref={dummy}></div>
  
      {messages.map((message) => (
        <div
          key={message.id}
          id={message.id}
          className="m-4 flex min-w-[352px] gap-2 rounded bg-zinc-300 p-4"
        >
          {userData && (
            <img
              className={`h-[32px] w-[32px] rounded-full ${
                userOnlineStatus[message.userId] ? "border-green-500 border-2" : "border-red-500 border-2"
              }`}
              src={message.userPhoto}
              width="32"
              height="32"
              alt="User Profile"
            />
          )}
  
          <div className="w-full ">
            <div className="flex items-baseline gap-4">
              {userData && <strong>{message.username}</strong>}
              <small>
                {message.createdAt &&
                  new Date(message.createdAt.seconds * 1000).toLocaleString("en-US", {
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                  })}
              </small>
  
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
  
            {/*/<p>
              {auth.currentUser?.uid !== message.userId ? (
                isBlocked(message.userId) ? (
                  <span>Blocked</span>
                ) : (
                  <span>{message.text}</span>
                )
              ) : (
                <span>{message.text}</span>
              )}

            </p>/*/}
            <span>{message.text}</span>
          </div>
        </div>
      ))}
    </div>
  )}