import AddChannelButton from "./AddChannelButton.tsx";
import ChannelsList from "./ChannelsList.tsx";

export default function LeftChannelBar() {
  return (
    <div className= "rgb(217, 217, 217)">
      <AddChannelButton />
      <ChannelsList />
    </div>
  );
}
