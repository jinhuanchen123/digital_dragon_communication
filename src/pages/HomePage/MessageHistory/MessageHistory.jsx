import React from 'react';
import messageHistory from "./historyData"
import Message from "./message"
import './styles.css'

export default function MessageHistory() {
    const [allMessages, setAllMessages] = React.useState();
    const [messages, setMessages] = React.useState(messageHistory.digitalDragonsChannel.map(message => 
    <Message 
    key={message.id} 
    account={message.account} 
    messageData={message.messageData} 
    />))
    const [count, setCount] = React.useState(1)

    React.useEffect(() => {
        fetch(/*backend history data */)
        .then(res => res.json())
        .then(data => setAllMessages(data)) //upon first load of the component we would want to load the message history of the first channel on the list that the user has access to
    }, [count])

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