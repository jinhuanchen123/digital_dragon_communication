import React from "react";
import TopBar from "@/components/ui/TopBar";
import AddChannel from "./AddChannel";
import MessageHistory from './MessageHistory/MessageHistory'
import MembersBar from "./membersBar";
import './home-page.css'



export default function HomePage() {

  const [channel, setChannel] = React.useState();

  function changeChannel(chosenChannel) {
    setChannel(() => chosenChannel)
  }

  return (
    <>
    <div id="home-page">
      <AddChannel 
        changeChannel={changeChannel}
      />
      <div id="home-page-middle-components">
        <TopBar />
        <MessageHistory />
      </div>
    <MembersBar />
    </div>
    
    </>
  );
}
