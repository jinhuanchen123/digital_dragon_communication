import { useEffect, useState } from "react";
import { db, auth } from "../Firebase/firebase.ts";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { Button } from "@/components/ui/button.tsx";

type Channel = {
  channelId: string;
  channelName: string;
};

export default function ChannelsList() {
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
              const data = doc.data() as Channel;
              return {
                id: doc.id,
                ...data,
              };
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

  return (
    <div>
      <ul>
        {channels.map((channel) => (
          <li key={channel.channelId}>
            <Button variant="secondary">{channel.channelName}</Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
