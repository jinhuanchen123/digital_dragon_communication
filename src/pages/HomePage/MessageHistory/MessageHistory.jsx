import { collection, addDoc, getDoc, onSnapshot } from "firebase/firestore"; 

import React from 'react';
import messageHistory from "./historyData"
import Message from "./message"
import './styles.css'

export default function MessageHistory() {
    React.useEffect(() => {
       const docRef = doc(db, 'cities',) //upon first load of the component we would want to load the message history of the first channel on the list that the user has access to
    }, [count])

    const { collection, getDocs } = require('firebase/firestore');

    const [allMessages, setAllMessages] = React.useState();
    const [messages, setMessages] = React.useState(messageHistory.digitalDragonsChannel.map(message => 
    <Message 
    key={message.id} 
    account={message.account} 
    messageData={message.messageData} 
    />))
    const [count, setCount] = React.useState(1)


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