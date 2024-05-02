import React from 'react';
import historyData from "./historyData"
import Message from "./message"
import './styles.css'

export default function MessageHistory() {

    const [messages, setMessages] = React.useState(historyData.digitalDragonsChannel.map(dataPoint => 
    <Message 
    key={dataPoint.id} 
    account={dataPoint.account} 
    messageData={dataPoint.messageData} 
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