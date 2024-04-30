// import { Avatar, AvatarFallback, AvatarImage } from './avatar/avatar'



export default function Message(props) {
    return (
        <>
            <div id="message-comp">
                {/* <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar> */}
                <img src="https://github.com/shadcn.png"></img>

                <div id="message-data">
                    <div id="name-date-delete">
                        <div id="name">{props.name}</div>
                        <div id="date">{props.date.day} at {props.date.time}</div>
                        <i id="delete" className="fa-regular fa-trash-can"></i>
                    </div>
                    {props.messageText}
                </div>
            </div>
        </>
    )
}