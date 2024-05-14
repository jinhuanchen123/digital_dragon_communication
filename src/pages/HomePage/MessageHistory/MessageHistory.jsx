import { collection, doc, onSnapshot } from "firebase/firestore"; 
import {db} from '../../../firebase'

import React from 'react';
import messageHistory from "./historyData"
import Message from "./message"
import './styles.css'

export default function MessageHistory() {

    const [messageData, setMessageData] = React.useState([])
    const [messages, setMessages] = React.useState([])


// Reference to the main document
const mainDocRef = doc(db, 'text_channels', 'bKlfoUirpppW4te2Mteg');

// Reference to the subcollection
const subcollectionRef = collection(mainDocRef, 'messages');

// Listening for changes in the subcollection
React.useEffect(() => {
    const unsub = onSnapshot(subcollectionRef, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
            const newMessageData = [change.doc.data(), change.doc.id];
            // console.log(newMessageData)
            setMessageData((prevMessageData) => 
                [...prevMessageData, newMessageData]
            )

        }
        if (change.type === 'modified') {
        //   console.log('Modified document:', change.doc.data());
        }
        if (change.type === 'removed') {
        //   console.log('Removed document:', change.doc.data());
        }
      });
    });
}, [])

React.useEffect(() => {
    console.log(messageData)
    setMessages(
        messageData.map((message) => (
        <Message 
            key={message[1]} 
            username={message[0].sender} 
            text={message[0].text}
            sentAt={message[0].sentAt}
        />
    )))
}, [messageData])




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