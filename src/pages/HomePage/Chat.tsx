import React, { useState, useEffect } from "react";
import { auth, db } from '../Firebase/firebase';
import { doc, getDoc, addDoc, serverTimestamp } from 'firebase/firestore';
import { query, collection, orderBy, onSnapshot, limit } from "firebase/firestore";
import ChatStyle from "./ChatStyles.module.css"; 
import avatarImage from '/./avatar.png';

interface Message {
  id: string;
  message: string;
  createdAt: Date;
  displayName: string;
  profilePictureUrl: string;
}

const SendMessage: React.FC = () => {
  const [message, setMessage] = useState("");
  const [userData, setUserData] = useState<any>({});
  const [allMessages, setAllMessages] = useState<Message[]>([]);
  const currentUser = auth.currentUser;

  useEffect(() => {
    const fetchData = async () => {
      if (currentUser) {
        try {
          const userDocRef = doc(db, 'users', currentUser.uid);
          const docSnapshot = await getDoc(userDocRef);
          if (docSnapshot.exists()) {
            setUserData(docSnapshot.data());
          } else {
            console.log("User data not found.");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchData();
  }, [currentUser]);

  useEffect(() => {
    const fetchData = async () => {
      if (!currentUser) {
        console.error("Current user not found.");
        return;
      }
  
      try {
        const userId = currentUser.uid;
        const docchannelID = doc(db, 'users', userId);
        const docSnapshot = await getDoc(docchannelID);
  
        if (docSnapshot.exists()) {
          const channelData = docSnapshot.data();
          const channelID = channelData['Channel ID'];
  
          const chatRef = collection(db, 'users', userId, 'text_channels', channelID, 'messages');
          const q = query(
            chatRef,
            orderBy("createdAt", "desc"),
            limit(50)
          );
  
          const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const fetchedMessages: Message[] = [];
            querySnapshot.forEach((doc) => {
              const data = doc.data();
              if (data) {
                fetchedMessages.push({
                  id: doc.id,
                  message: data.message,
                  createdAt: data.createdAt.toDate(),
                  displayName: data.displayName,
                  profilePictureUrl: data.profilePictureUrl,
                });
              }
            });
  
            const sortedMessages = fetchedMessages.sort(
              (a, b) => a.createdAt.getTime() - b.createdAt.getTime()
            );
  
            setAllMessages(sortedMessages);
          });
  
          return unsubscribe;
        } else {
          console.error("Channel ID document not found.");
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
  
    fetchData();
  }, [currentUser]);
  
  
  const sendMessage = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!currentUser) {
      console.error("Current user not found.");
      return;
    }

    if (message.trim() === "") {
      return;
    }

    const messageData = {
      createdAt: serverTimestamp(),
      userId: currentUser.uid,
      displayName: userData.displayName || '',
      profilePictureUrl: userData.profilePictureUrl || '',
      message: message,
    };

    try {
      const userRef = doc(db, "users", currentUser.uid);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const displayName = userData.displayName;
        const photoURL = userData.profilePictureUrl;
  
        const messageData = {
          createdAt: serverTimestamp(),
          userId: currentUser.uid,
          displayName: displayName || "",
          profilePictureUrl: photoURL || "",
          message: message,
        };
  
        const channelID = userData["Channel ID"];
        const chatRef = collection(
          db,
          "users",
          currentUser.uid,
          "text_channels",
          channelID,
          "messages"
        );
  
        await addDoc(chatRef, messageData);
        setMessage(""); // Assuming setMessage is used to clear the message input field
      } else {
        console.error("User data not found.");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const MessageComponent: React.FC<{ message: Message }> = ({ message }) => {
    return (
      <div className={ChatStyle.message}>
        <div className={ChatStyle.message_header}>
          {userData.profilePictureUrl ? (
            <img
              src={message.profilePictureUrl}
              alt="Profile Picture"
              className={ChatStyle.profile_image}
            />
          ) : (
            <img
              src={avatarImage}
              alt="Default Avatar"
              className={ChatStyle.avatarImage}
            />
          )}
          <span className={ChatStyle.display_name}>{userData.displayName}</span>
        </div>
        <p className={ChatStyle.message_text}>{message.message}</p>
        <span className={ChatStyle.message_time}>{message.createdAt.toLocaleTimeString()}</span>
      </div>
    );
  };

  return (
    <main className={ChatStyle.chat_box}>
      <div className={ChatStyle.message_wrapper}>
        {allMessages.map((message) => (
          <MessageComponent key={message.id} message={message} />
        ))}
      </div>
      <form onSubmit={sendMessage} className={ChatStyle.send_message}>
        <label htmlFor="messageInput" hidden>Enter Message</label>
        <input
          id="messageInput"
          name="messageInput"
          type="text"
          className={ChatStyle.form_input}
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </form>
    </main>
  );
};

export default SendMessage;
