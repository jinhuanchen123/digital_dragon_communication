import LeftSideBar from "./LeftSideBar";
import AddChannel from "./AddChannel";
import SettingsBar from "./SettingsBar";

export default function HomePage() {
  return (
    <div>
    <h1>
      This is the Home page
    </h1>
    <LeftSideBar />
    <AddChannel/>
    <SettingsBar/>
    
    </div>
  );
}
