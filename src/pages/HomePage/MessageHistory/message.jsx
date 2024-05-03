import { Avatar, AvatarFallback, AvatarImage } from "./msg-history-avatar"; // Assuming correct import path for Avatar components




export default function Message(props) {
    return (
        <>
            <div id="message-component">
                    
                <Avatar>
                    <AvatarImage src={props.account.pfp} />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>

                <div id="message-data">
                    <div id="name-date-delete">
                        <div id="name">{props.account.name}</div>
                        <div id="date">{props.messageData.date.day} at {props.messageData.date.time}</div>
                        <i id="delete" className="fa-regular fa-trash-can"></i>
                    </div>
                    {props.messageData.messageText}
                </div>
            </div>
        </>
    )
}