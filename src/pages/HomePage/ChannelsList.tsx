import { useEffect, useState } from "react";
import { db, auth } from "../Firebase/firebase.ts";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { Button } from "@/components/ui/button.tsx";

type Channel = {
  id: string;
  channelName: string;
};

type ChannelsListProps = {
  onSelectChannel: (channelId: string) => void;
};

export default function ChannelsList({ onSelectChannel }: ChannelsListProps) {
  const [channels, setChannels] = useState<Channel[]>([]);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        const q = query(
          collection(db, "text_channels"),
          where("members", "array-contains", user.uid),
        );
        const unsubscribe = onSnapshot(
          q,
          (querySnapshot) => {
            const channelList = querySnapshot.docs.map((doc) => {
              const data = doc.data();
              return {
                id: doc.id,
                channelName: data.channelName,
                ...data,
              } as Channel;
            });
            setChannels(channelList);
          },
          (error) => {
            console.error(error);
          },
        );

        return () => unsubscribe();
      } else {
        setChannels([]);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  function truncateChannelName(str: string) {
    return str.length > 15 ? str.substring(0, 15) + "..." : str;
  }

  return (
    <div className="mt-4 grow overflow-y-auto">
      <ul className=" grid gap-4 ">
        {channels.map((channel) => (
          <li key={channel.id} onClick={() => onSelectChannel(channel.id)}>
            <Button className="min-w-44" variant="ghost">
              {truncateChannelName(channel.channelName)}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
