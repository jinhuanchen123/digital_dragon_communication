import TopBar from "@/components/ui/TopBar";
import AddChannel from "./AddChannel";
import MessageHistory from './MessageHistory/MessageHistory'
import './home-page.css'



export default function HomePage() {
  return (
    <>
    <h1>This is the Home page</h1>
    <div id="home-page">
      <AddChannel />
      <div id="middle-components">
        <TopBar />
        <MessageHistory />
      </div>
    </div>
    
    </>
  );
}
