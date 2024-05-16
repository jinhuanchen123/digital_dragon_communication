import React, { useState, useEffect, FormEvent } from "react";
import { collection, query, where, getDocs, doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../Firebase/firebase';
import avatarImage from '/./avatar.png';
import UserBox_style from './UserBox.module.css';

interface UserData {
  uid: string;
  displayName: string;
  profilePictureUrl?: string;
  [key: string]: any;
}

const Chatbox: React.FC<{}> = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<UserData[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<UserData[]>([]);

  const handleSearch = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('displayName', '>=', searchTerm), where('displayName', '<=', searchTerm + '\uf8ff'));
      const querySnapshot = await getDocs(q);
      const results: UserData[] = [];
      querySnapshot.forEach((doc) => {
        results.push(doc.data() as UserData);
      });
      setSearchResults(results);
    } catch (error) {
      console.error("Error searching for users:", error);
    }
  };

  const handleAdd = async (user: UserData) => {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      console.error("Current user not found.");
      return;
    }

    try {
      const usersCollectionRef = collection(db, 'users');
      const usersSnapshot = await getDocs(usersCollectionRef);
      let selectedUserId: string | null = null;

      usersSnapshot.forEach((userDoc) => {
        if (userDoc.data().displayName === user.displayName) {
          selectedUserId = userDoc.id;
        }
      });

      if (!selectedUserId) {
        console.error("Selected user not found in the database.");
        return;
      }

      const docchannelID = doc(db, 'users', currentUser.uid);
      const docSnapshot = await getDoc(docchannelID);

      if (docSnapshot.exists()) {
        const userData = docSnapshot.data();
        const channelID = userData['Channel ID']

        const userChannelsRef = collection(db, 'users', currentUser.uid, 'text_channels');
        const newChannelDocRef = doc(userChannelsRef, channelID);

        await setDoc(newChannelDocRef, {
          members: [currentUser.uid, selectedUserId],
        });

        console.log("Channel created successfully");
      } else {
        console.log("Channel ID document not found");
      }
    } catch (error) {
      console.error("Error creating channel:", error);
    }
    // Assuming you have functions to update state for selectedUsers, setSearchResults, and setSearchTerm
    setSelectedUsers(prevUsers => [...prevUsers, user]);
    setSearchResults([]);
    setSearchTerm('');
  };

  return (
    <div className={UserBox_style.chatbox}>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search username"
          className={UserBox_style.searchInput}
        />
        <button type="submit" className={UserBox_style.searchButton}>Search</button>
      </form>
      <div className={UserBox_style.searchResults}>
        {searchResults.map((user, index) => (
          <div key={index} className={UserBox_style.searchResultItem}>
            <img src={user.profilePictureUrl || avatarImage} alt={user.displayName} className={UserBox_style.avatar} />
            <span>{user.displayName}</span>
            <button onClick={() => handleAdd(user)} className={UserBox_style.addButton}>Add</button>
          </div>
        ))}
      </div>
      <div className={UserBox_style.selectedUsers}>
        {selectedUsers.map((user, index) => (
          <div key={index} className={UserBox_style.selectedUser}>
            <img src={user.profilePictureUrl || avatarImage} alt={user.displayName} className={UserBox_style.avatar} />
            <span>{user.displayName}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chatbox;
