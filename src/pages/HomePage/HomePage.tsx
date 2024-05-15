
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faGear } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import SendMessage from "./Chat";
import Invite from "./Invite";
import AddChannelButton from "./AddChannelButton";
import TopBar from "./TopBar";
import Home_Styles from "./HomePage.module.css";
import MembersBar from './membersBar';
import ButtonTemplate from "../ButtonTemplate";
import ChannelsList from "./ChannelsList";
import MessagesWindow from "./MessagesWindow";
import MessageInput from "./MessageInput";

export default function HomePage() {
  const [textChannel, setTextChannel] = React.useState('wMhh2pYwgsYxZ1SZs734KzVsAF02')

  const navigate = useNavigate();
  const [selectedChannel, setSelectedChannel] = useState<string | null>(null);

  const handleInviteClick = () => {
    // Perform invite functionality here
    console.log("Inviting user...");
    // Example navigation to invite page
    navigate("/invite");
  };
  const handleRedictMainPage = () => {
    navigate("/setting/profile");
  };

  return (
    <div className={Home_Styles.home}>
      <div className={Home_Styles.leftSide}>
        <div className={Home_Styles.channelComponents} >

          <AddChannelButton />x
          <ChannelsList onSelectChannel={setSelectedChannel} />
        </div>
        
        <div className={Home_Styles.icon_function}>

         <FontAwesomeIcon
          icon={faGear}
          className={Home_Styles.settingIconStyle}
          onClick={handleRedictMainPage}
        />
          <FontAwesomeIcon
          icon={faUser}
          className={Home_Styles.userIconStyle}
          onClick={handleInviteClick}
        />

        </div>
        


      </div>
      <div className={Home_Styles.MiddleSide}>
        <div className={Home_Styles.MiddleSide_top}>
          <TopBar />
        </div>

        {/*<SendMessage />*/}
        {selectedChannel && (
          <>
            <MessagesWindow channelId={selectedChannel} />
            <MessageInput channelId={selectedChannel} />
          </>
        )}
      </div>
      <div className={Home_Styles.RightSide}>
        {/* Include other components or content here */}
      </div>
    <MembersBar channelId={selectedChannel}/>
    </div>
  );
}
