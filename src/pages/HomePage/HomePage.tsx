import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import AddChannelButton from "./AddChannelButton";
import TopBar from "./TopBar";
import Home_Styles from "./HomePage.module.css";
import RightSide_Invite from "./RightSideInvite";
import Chatbox from "./UserBox";
import ChannelsList from "./ChannelsList";
import MessagesWindow from "./MessagesWindow";
import MessageInput from "./MessageInput";

export default function HomePage() {
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
        {/*<ChannelInfo/> */}

        <AddChannelButton />
        <ChannelsList onSelectChannel={setSelectedChannel} />

        {/*        <LeftChannelBar /> */}
        <div className={Home_Styles.icon_function}>
          <FontAwesomeIcon
            icon={faGear}
            className={Home_Styles.settingIconStyle}
            onClick={handleRedictMainPage}
          />
        </div>
      </div>
      <div className={Home_Styles.MiddleSide}>
        <div className={Home_Styles.MiddleSide_top}>
          <TopBar
            selectedChannel={selectedChannel}
            onSelectChannel={setSelectedChannel}
          />
        </div>
        {/*        <SendMessage  />*/}
        {selectedChannel && <MessagesWindow channelId={selectedChannel} />}
        {selectedChannel && <MessageInput channelId={selectedChannel} />}
      </div>
      {selectedChannel && (
      <div className={Home_Styles.RightSide}>
        <Chatbox channelId={selectedChannel}/>
        <RightSide_Invite channelId={selectedChannel} />
      </div>
      )}
    </div>
  );
}
