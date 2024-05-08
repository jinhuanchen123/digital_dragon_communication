import TopBar from "@/components/ui/TopBar";
<<<<<<< HEAD
import AddChannel from "./AddChannel";
import MessageHistory from './MessageHistory/MessageHistory'
import style from "./HomePage.module.css";
import LeftChannelBar from "./LeftChannelBar";


export default function HomePage() {
  return (
    <div className={style.home}>
      <LeftChannelBar />
      <div id="middle-components">
        <TopBar />
        <MessageHistory />
      </div>
    </div>
=======

export default function HomePage() {
  return (
    <>
      <h1>This is the Home page</h1>
      <TopBar />
    </>
>>>>>>> bcd475303441fcab29b972bbce82841b73a0a86b
  );
}
