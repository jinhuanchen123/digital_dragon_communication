import TopBar from "@/components/ui/TopBar";
import AddChannel from "./AddChannel";
import MessageHistory from './MessageHistory/MessageHistory'
import './home-page.css'
import SettingsBar from "./SettingsBar";
import AddChannelTest from "./AddChannelTest";




export default function HomePage() {
  return (
    <>
    
    <div id="home-page  bg-gray-200" className=" bg-gray-200 flex flex-col justify-center">
      <div  className="">
      <TopBar />
      </div>
     <div id="middle-components" className=" bg-gray-400 max-w-sm min-h-screen ">
      

      <AddChannel />
      <SettingsBar />

          </div>
        <MessageHistory />
          
      </div>
      
    </>
  );
}
