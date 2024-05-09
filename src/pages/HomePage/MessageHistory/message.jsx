import { Avatar, AvatarFallback, AvatarImage } from "./msg-history-avatar"; // Assuming correct import path for Avatar components




export default function Message(props) {

    function formatTimestamp(timestamp) {
        const now = new Date(); // Current date/time
        const date = new Date(timestamp * 1000); // Convert seconds timestamp to milliseconds
      
        // Check if the date is yesterday
        const isYesterday = date.getDate() === now.getDate() - 1;
      
        // Format the date as MM/DD/YYYY or "Yesterday"
        let formattedDate;
        if (isYesterday) {
          formattedDate = 'Yesterday';
        } else {
          const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
          const day = date.getDate().toString().padStart(2, '0');
          const year = date.getFullYear();
          formattedDate = `${month}/${day}/${year}`;
        }
      
        // Format the time as HH:mm in 12-hour format
        const hours = date.getHours() % 12 || 12; // Handle 0 as 12 for 12-hour format
        const minutes = date.getMinutes().toString().padStart(2, '0'); // Add leading zero if needed
        const ampm = date.getHours() >= 12 ? 'PM' : 'AM';
        const formattedTime = `${hours}:${minutes} ${ampm}`;
      
        return `${formattedDate} at ${formattedTime}`;
      }
      
      // Example usage:
      const secondsTimestamp = props.sentAt.seconds; // Example seconds timestamp
      const formattedDateTime = formatTimestamp(secondsTimestamp);
      
      


    return (
        <>
            <div id="message-component">
                    
                <Avatar>
                    <AvatarImage src={"https://github.com/shadcn.png"} />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>

                <div id="message-data" className="text-2xl">
                    <div id="name-date-delete">
                        <div id="name">{props.sender}</div>
                        <div id="time-stamp">{formattedDateTime}</div>
                        <i id="delete" className="fa-regular fa-trash-can"></i>
                    </div>
                    {props.text}
                </div>
            </div>
        </>
    )
}