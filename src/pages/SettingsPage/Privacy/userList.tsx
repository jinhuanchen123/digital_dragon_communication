import React, { useState, useEffect } from 'react';
import { db } from '../../Firebase/firebase';
import { collection, getDocs, doc, setDoc, getDoc } from 'firebase/firestore';

const UserList: React.FC = () => {
  const [users, setUsers] = useState([]);
  const [targetUserId, setTargetUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersCollection = collection(db, 'users');
        const usersSnapshot = await getDocs(usersCollection);
        const usersData = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const addUserToSubcollection = async (userId: string, targetUserId: string, userData: any) => {
    try {
      // Get target user document from the current collection
      const targetUserDocRef = doc(db, 'users', targetUserId);

      // Create a subcollection-like structure within the target user document
      const newUserDocRef = doc(targetUserDocRef, 'blockedList', userId); 
      await setDoc(newUserDocRef, { uid: userId, userData });

      console.log(`User ${userId} added to subcollection of user ${targetUserId}`);
    } catch (error) {
      console.error('Error adding user to subcollection:', error);
    }
  };

  const handleButtonClick = async (userId: string) => {
    if (targetUserId) {
      // Find the user data from the users array
      const userData = users.find(user => user.id === userId);
      if (userData) {
        await addUserToSubcollection(userId, targetUserId, userData);
      } else {
        console.error('User data not found for user ID:', userId);
      }
    } else {
      console.error('Target user ID not specified.');
    }
  };

  return (
    <div>
      <h1>User List</h1>
      <p>Populating subcollection of user with ID: {targetUserId}</p>
      <p>Select a target user:</p>
      <select value={targetUserId} onChange={(e) => setTargetUserId(e.target.value)}>
        <option value="">Select user</option>
        {users.map(user => (
          <option key={user.id} value={user.id}>{user.displayName}</option>
        ))}
      </select>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.displayName} - {user.uid}
            <button onClick={() => handleButtonClick(user.id)}>Add to Subcollection</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;