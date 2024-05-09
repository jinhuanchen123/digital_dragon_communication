import { collection, doc, onSnapshot } from "firebase/firestore"; 
import {db} from '../../../firebase'

import React from 'react';
import messageHistory from "./historyData"
import Message from "./message"
import './styles.css'

export default function MessageHistory() {

    const [messages, setMessages] = React.useState(messageHistory.digitalDragonsChannel.map((doc) => 
    <Message 
        key={doc.id}
        sender={doc.sender}
        sentAt={doc.sentAt}
        text={doc.text}
    />
    ))
    // const [messages, setMessages] = React.useState([])


// Reference to the main document
const mainDocRef = doc(db, 'text_channels', 'bKlfoUirpppW4te2Mteg');

// Reference to the subcollection
const subcollectionRef = collection(mainDocRef, 'messages');

// // Listening for changes in the subcollection
// React.useEffect(() => {
//     const unsub = onSnapshot(subcollectionRef, (snapshot) => {
//       snapshot.docChanges().forEach((change) => {
//         if (change.type === 'added') {
//             const messageData = [];
//             messageData.push(change.doc.data)
//             const newMessages = messageData.map((data) => <Message 
//                 key={messageData.length + 1} 
//                 username={data.sender} 
//                 text={data.text}
//                 sentAt={data.sentAt}
//                 />)
//             setMessages(newMessages)
//           console.log('New document:', change.doc.id, change.doc.data());
//         }
//         if (change.type === 'modified') {
//         //   console.log('Modified document:', change.doc.data());
//         }
//         if (change.type === 'removed') {
//         //   console.log('Removed document:', change.doc.data());
//         }
//       });
//     });
// }, [])




    return (
        <>
            <div id="message-history">
                <div id="message-history-data">
                    <div>{messages}</div>
                </div>
                <form>
                    <input id="message-history-input" type="text" placeholder="Type a new message" />
                </form>
            </div>
        </>
    )
}