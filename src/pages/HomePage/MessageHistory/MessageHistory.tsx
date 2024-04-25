//import history data
import Message from "./Message"
import './styles.css'

export default function MessageHistory() {

    //const [messages, setMessages] = React.useState(historyData.map(dataPoint => <Message key={dataPoint.id} avatar={dataPoint.avatar} messageData={messageData} />))

    return (
        <>
            <div id="message-history">
                <div id="message-history-data">

                    <div>{/*messages*/}</div>
                    <Message name='Stefin' date={{day: 'today', time: '2:30 PM'}} messageText="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."/>
                    <Message name='Gabriel' date={{day: 'today', time: '2:32 PM'}} messageText="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English."/>

                </div>
                <input id="message-history-input" type="text" placeholder="Type a new message" />
            </div>
        </>
    )
}