import React, { useState, FormEvent } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  arrayUnion,
  addDoc
} from "firebase/firestore";
import { auth, db } from "../Firebase/firebase";
import UserBox_style from "./UserBox.module.css";

interface UserData {
  uid: string;
  displayName: string;
  profilePictureUrl: string;
  [key: string]: string;
}

type MessageInputProps = {
  channelId: string;
};
const default_sound= "https://firebasestorage.googleapis.com/v0/b/digital-dragon-communication.appspot.com/o/sounds%2Frhea.mp3?alt=media&token=b750b51d-ada8-4649-a4b4-1898661957e4"
const Chatbox: React.FC<MessageInputProps> = ({ channelId }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<UserData[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<UserData[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    try {
      const usersRef = collection(db, "users");
      const q = query(
        usersRef,
        where("displayName", ">=", searchTerm),
        where("displayName", "<=", searchTerm + "\uf8ff"),
      );
      const querySnapshot = await getDocs(q);
      const results: UserData[] = [];
      querySnapshot.forEach((doc) => {
        results.push({ uid: doc.id, ...doc.data() } as UserData);
      });
      setSearchResults(results);
    } catch (error) {
      console.error("Error searching for users:", error);
      setError("Error searching for users.");
    }
  };

  const handleAdd = async (user: UserData) => {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      console.error("Current user not found.");
      setError("Current user not found.");
      return;
    }

    const userId = currentUser.uid;

    if (!currentUser) {
      console.error("User not found.");
      return;
    }
    try {
      const userChannelsRef = doc(db, "text_channels", channelId);
      const muteStatusRef=collection(db, "text_channels", channelId, "muteStatuses")
      await addDoc(muteStatusRef,{
        uid: user.uid,
        username: user.displayName,
        muteStatus:"unmute",
        soundURL:default_sound,
        soundName:"default",
      })

      await updateDoc(userChannelsRef, {
        members: arrayUnion(userId, user.uid), 
      });

      console.log("Update successful");
      setSelectedUsers((prevUsers) => [...prevUsers, user]);
      setSearchResults([]);
      setSearchTerm("");
      window.location.reload();
    } catch (error) {
      console.error("Error adding user to channel:", error);
      setError("Error adding user to channel.");
    }
  };

  return (
    <div className={UserBox_style.chatbox}>
      {error && <p className={UserBox_style.error}>{error}</p>}
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search username"
          className={UserBox_style.searchInput}
        />
        <button type="submit" className={UserBox_style.searchButton}>
          Search
        </button>
      </form>
      <div className={UserBox_style.searchResults}>
        {searchResults.map((user, index) => (
          <div key={index} className={UserBox_style.searchResultItem}>
            <img
              src={user.profilePictureUrl}
              alt={user.displayName}
              className={UserBox_style.avatar}
            />
            <span>{user.displayName}</span>
            <button
              onClick={() => handleAdd(user)}
              className={UserBox_style.addButton}
            >
              Add
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chatbox;
