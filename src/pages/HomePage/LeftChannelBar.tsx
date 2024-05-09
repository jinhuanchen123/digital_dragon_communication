import AddChannelButton from "./AddChannelButton.tsx";
import ChannelsList from "./ChannelsList.tsx";

export default function LeftChannelBar() {
  return (
    <div className="bg-slate-100 p-4 w-60 ">
      <AddChannelButton />
      <ChannelsList />
    </div>
  );
}
