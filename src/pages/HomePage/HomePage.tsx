import MessageHistory from './MessageHistory/MessageHistory'
import style from "./HomePage.module.css";
import LeftChannelBar from "./LeftChannelBar";
import TopBar from './TopBar';


export default function HomePage() {
  return (
    <div className={style.home}>
      <LeftChannelBar />
      <div id="middle-components">
        <TopBar />
        <MessageHistory />
      </div>
    </div>
  );
}
