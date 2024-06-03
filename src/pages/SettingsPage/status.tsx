import React, { useEffect, useState } from 'react';
import { db, auth } from '../Firebase/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

const OnlineStatus: React.FC = () => {
  const [isOnline, setIsOnline] = useState<boolean>(false);
  const [timestamp, setTimestamp] = useState<string>('');

  useEffect(() => {
    const toggleUserOnlineStatus = async () => {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        console.error("User not logged in");
        return;
      }
      const userId = currentUser.uid;
      const userDocRef = doc(db, 'users', userId);

      try {
        const docSnapshot = await getDoc(userDocRef);
        const currentOnlineStatus = docSnapshot.data()?.online || false;

        // Update the 'online' field to its opposite value
        await updateDoc(userDocRef, {
          online: !currentOnlineStatus,
        });

        // Update the timestamp state variable to trigger re-render
        setTimestamp(new Date().toLocaleString());

        // Update the isOnline state variable
        setIsOnline(!currentOnlineStatus);
      } catch (error) {
        console.error('Error toggling online status:', error);
      }
    };

    toggleUserOnlineStatus();
  }, []);

  return (
    null
    /*/<div>
      {isOnline ? <p>User is online</p> : <p>Timestamp: {timestamp}</p>}
    </div>
    /*/
  );
};

export default OnlineStatus;
