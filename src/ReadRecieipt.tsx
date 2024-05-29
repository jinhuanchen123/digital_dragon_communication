import React, { useState, useEffect } from 'react';
import { getFirestore, doc, onSnapshot } from 'firebase/firestore';

interface ReadReceiptProps {
  messageId: string;
  userId: string;
}

interface MessageData {
  readBy: 'True';
}

const ReadReceipt: React.FC<ReadReceiptProps> = ({ messageId, userId }) => {
  const [isRead, setIsRead] = useState<boolean>(false);

  useEffect(() => {
    const firestore = getFirestore();
    const messageRef = doc(firestore, 'messages', messageId);

    const unsubscribe = onSnapshot(messageRef, (snapshot) => {
      const data = snapshot.data() as MessageData;
      if (data && data.readBy && data.readBy.includes(userId)) {
        setIsRead(true);
      } else {
        setIsRead(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [messageId, userId]);

  return (
    <span>
      {isRead && <i className="bg-indigo-400 rounded-full" >read</i>}
      
      {!isRead && <div><i className="bg-red-400 rounded-full" >sent</i></div>}
    </span>
  );
};

export default ReadReceipt;
