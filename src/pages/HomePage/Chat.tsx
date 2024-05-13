import React, { useState, useEffect, useRef } from "react";
import { auth, db } from '../Firebase/firebase';
import { doc, setDoc, serverTimestamp, DocumentSnapshot, getDoc ,addDoc} from 'firebase/firestore';
import {
  query,
  collection,
  orderBy,
  onSnapshot,
  limit,
  QuerySnapshot,
} from "firebase/firestore";
import ChatStyle from "./ChatStyles.module.css"; // Assuming your CSS file is named ChatStyles.css
import avatarImage from '/./avatar.png';
interface Message {
  id: string;
  message: string;
  createdAt: Date;
}

const SendMessage = () => {
  const [message, setMessage] = useState("");
  const [userData, setUserData] = useState<any>({});
  const [allMessages, setAllMessages] = useState<Message[]>([]); // State variable to store all messages
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
    const q = query(
      collection(db, "chats"),
      orderBy("createdAt", "desc"),
      limit(50)
    );
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      const fetchedMessages: Message[] = [];
      QuerySnapshot.forEach((doc: DocumentSnapshot) => {
        const data = doc.data();
        if (data) {
          const message: Message = {
            id: doc.id,
            message: data.message,
            createdAt: data.createdAt.toDate()
          };
          fetchedMessages.push(message);
        }
      });
      const sortedMessages = fetchedMessages.sort(
        (a, b) => a.createdAt.getTime() - b.createdAt.getTime()
      );
      setAllMessages(sortedMessages); // Update all messages
      // Scroll to the bottom when new messages are loaded
     
    });
    return () => unsubscribe();
  }, []);

  const sendMessage = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!currentUser) {
      console.error("Current user not found.");
      return;
    }
    const userId = currentUser.uid;

    if (message.trim() === "") {
      return;
    }

    const messageData = {
      createdAt: serverTimestamp(),
      userId,
      displayName: userData.displayName || '',
      profilePictureUrl: userData.profilePictureUrl || '',
      message: message
    };

    const chatRef = doc(db, 'chats', userId);
    // await setDoc(chatRef, messageData, { merge: true });
    await addDoc(collection(db, 'chats'), messageData);

    setMessage("");
  };
  // MessageComponent for rendering individual messages
const MessageComponent: React.FC<{ message: Message }> = ({ message }) => {
    return (
      <div className={ChatStyle.message}>
        <p>{message.message}</p>
        <span className={ChatStyle.message_time}>{message.createdAt.toLocaleTimeString()}</span>
      </div>
    );
  };

  return (
    <main className={ChatStyle.chat_box}>
        <div className={ChatStyle.pro_text}>
        <div className={ChatStyle.profile_box}>
      
      <div>
            {userData.profilePictureUrl ? (
              <img
                src={userData.profilePictureUrl}
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
    </div>
  
        </div>
      
      <div className={ChatStyle.message_wrapper}>
      {userData.displayName && (
        <div>
          {userData.displayName}
        </div>
      )}
      
        {allMessages?.map((message) => (
          <MessageComponent key={message.id} message={message} />
        ))}
      </div>

        </div>
        
     
      <form onSubmit={sendMessage} className={ChatStyle.send_message}>
        <label htmlFor="messageInput" hidden>Enter Message</label>
        <input
          id="messageInput"
          name="messageInput"
          type="text"
          className={ChatStyle.form_input}
          placeholder="type message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
       
      </form>
    </main>
  );
};



export default SendMessage;
