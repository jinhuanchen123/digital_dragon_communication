import { Timestamp, collection, doc, onSnapshot, orderBy, query, deleteDoc } from "firebase/firestore";
import { db } from "../Firebase/firebase";
import { useEffect, useState } from "react";
import HomeStyles from './HomePage.module.css'
import { auth } from '../Firebase/firebase'
import React, { MouseEventHandler } from "react";
import { HomeIcon } from "lucide-react";



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
  let userID;
  if(auth.currentUser) {
    userID = auth.currentUser.uid;
  } else {
    userID = null;
  }
  
  // function onDisplay(id) {
  //   document.getElementById(`${id}`).style
  // }

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

  function btnOver(messageID) {
    const buttonEle = document.getElementById(`${messageID}button`);
    if(buttonEle) {
      buttonEle.style.color = 'white';
      buttonEle.style.backgroundColor = '#512da8';
    }
  }
  function btnOut(messageID) {
    const buttonEle = document.getElementById(`${messageID}button`);
    if(buttonEle) {
      buttonEle.style.backgroundColor = 'rgba(0,0,0,0)';
      buttonEle.style.color = '#512da8';
    }
  }
  async function btnClicked(messageID) {
    await deleteDoc(doc(db, 'text_channels', channelId, 'messages', messageID));

  } 



  return (
    <div className={HomeStyles.messageWindow}>
      {messages.map((message) => (
        <div key={message.id} id={message.id} className={`m-4 flex bg-zinc-300 p-4 gap-2 rounded ${HomeStyles.message}`} >{/*onMouseOver={onDisplay(message.id)}*/}
          <img
            className="h-[32px] w-[32px] "
            src={message.userPhoto}
            width="32"
            height="32"
          />
          <div className={HomeStyles.messageContent}>
            <div className={HomeStyles.messageTitle}>
              <div>

                <strong className="mr-4">{message.username}</strong>
                <small>
                  {message.createdAt &&
                    new Date(message.createdAt.seconds * 1000).toLocaleString()}
                </small>
              </div>
              {userID == message.userId  && <button 
                id={`${message.id}button`} 
                onMouseOut={() => btnOut(message.id)} 
                onMouseOver={() => btnOver(message.id)}  
                onClick={() => btnClicked(message.id)}
                className={HomeStyles.deleteBtn}
                >delete
              </button>}
            </div>
            <p>{message.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
