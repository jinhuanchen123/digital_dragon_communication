import TopBar from "@/components/ui/TopBar";
import AddChannel from "./AddChannel";
import MessageHistory from './MessageHistory/MessageHistory'
import './home-page.css'



export default function HomePage() {

  const [channel, setChannel] = React.useState();

  function changeChannel(chosenChannel) {
    setChannel(() => chosenChannel)
  }

  return (
    <>
    <h1>This is the Home page</h1>
    <div id="home-page">
      <AddChannel 
        changeChannel={changeChannel}
      />
      <div id="middle-components">
        <TopBar />
        <MessageHistory />
      </div>
    </div>
    
    </>
  );
}
