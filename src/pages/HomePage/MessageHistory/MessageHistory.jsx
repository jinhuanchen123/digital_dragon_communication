import React from 'react';
import messageHistory from "./historyData"
import Message from "./message"
import './styles.css'

export default function MessageHistory() {

    const [messages, setMessages] = React.useState(messageHistory.digitalDragonsChannel.map(message => 
    <Message 
    key={message.id} 
    account={message.account} 
    messageData={message.messageData} 
    />))

    return (
        <>
            <div id="message-history">
                <div id="message-history-data">
                    <div>{messages}</div>
                </div>
                <input id="message-history-input" type="text" placeholder="Type a new message" />
            </div>
        </>
    )
}