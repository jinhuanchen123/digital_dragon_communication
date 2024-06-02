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
  username: string;
  userPhoto: string;
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
    dummy.current && dummy.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    document.body.style.background = userData?.online ? 'red' : 'green';
  }, [userData?.online]);

  const isBlocked = async (userId: string) => {
    if (!auth.currentUser) return false; // Not signed in

    try {
      const docRef = doc(db, "users", auth.currentUser.uid, "blocked", userId);
      const docSnap = await getDoc(docRef);
      return docSnap.exists();
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
                userData.online ? "border-green-500 border-2" : ""
              }`}
              src={message.userPhoto}
              width="32"
              height="32"
              alt="User Profile"
            />
          )}

          <div className="w-full ">
            <div className="flex items-baseline gap-4">
              
              {userData && <strong>{message.username}</strong> }  
              <small>
                {message.createdAt &&
                  new Date(message.createdAt.seconds * 1000).toLocaleString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "numeric",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    },
                  )}
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

            <p>
              {auth.currentUser?.uid === message.userId ? (
                // Check if the sender has blocked the recipient
                isBlocked(message.userId) ? "Blocked" : message.text
              ) : (
                message.text
              )}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
