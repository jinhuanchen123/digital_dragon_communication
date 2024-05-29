// TestReadReceipt.tsx

import React from 'react';
import ReadReceipt from './ReadRecieipt';

const TestReadReceipt: React.FC = () => {
  // Mock message ID and user ID
  const messageId = "sampleMessageId";
  const userId = "sampleUserId";

  
  return (
    <div>
      <h2>Testing Read Receipt Component</h2>
      <ReadReceipt messageId={messageId} userId={userId} />
    </div>
  );
};

export default TestReadReceipt;
