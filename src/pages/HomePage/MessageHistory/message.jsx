// import { Avatar, AvatarFallback, AvatarImage } from './avatar/avatar'



export default function Message(props) {
    return (
        <>
            <div id="message-comp">
                {/* <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar> */}
                <img className="message-history-avatar" src={props.account.pfp}></img>

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