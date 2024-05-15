import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { db, auth } from "../Firebase/firebase.ts";
import { collection, addDoc, serverTimestamp, arrayUnion, updateDoc, doc,setDoc } from "firebase/firestore";

export default function AddChannelButton() {
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [isLeaveOpen, setIsLeaveOpen] = useState(false);
  const [createChannelName, setCreateChannelName] = useState("");
  const [joinChannelName, setJoinChannelName] = useState("");

  async function createChannel() {
    const user = auth.currentUser;
    if (!user) {
      console.error("User not found.");
      return;
    }

    try {
      const userChannelsRef = collection(db, 'users', user.uid, 'text_channels');
      const newChannelDocRef = await addDoc(userChannelsRef, {
        channelName: createChannelName,
        createdAt: serverTimestamp(),
        // members: [user.uid], // You can include members if needed
      });
      const newChannelId = newChannelDocRef.id;
      const setchannelID = doc(db, 'users', user.uid)
      await setDoc(setchannelID, {"Channel ID" : newChannelId},{merge:true})

      setIsInviteOpen(false); // Close the dialog after successful channel creation
    } catch (err) {
      console.error("Error creating channel:", err);
    }
  }






  

  async function joinChannel() {
    const user = auth.currentUser;
    if (!user) {
      console.error("User not found.");
      return;
    }

    try {
      const channelRef = doc(db, "text_channels", joinChannelName);
      await updateDoc(channelRef, {
        members: arrayUnion(user.uid)
      });
      setIsLeaveOpen(false); // Close the dialog after successful join
    } catch (err) {
      console.error("Error joining channel:", err);
    }
  }

  return (
    <Dialog
      open={isInviteOpen || isLeaveOpen}
      onOpenChange={isInviteOpen ? setIsInviteOpen : setIsLeaveOpen}
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>Add Channel</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuItem onClick={() => setIsInviteOpen(true)}>
            <Button variant="ghost">Create Channel</Button>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsLeaveOpen(true)}>
            <Button variant="ghost">Join Channel</Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {isInviteOpen ? (
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create Channel</DialogTitle>
            <DialogDescription>Give a name to your new channel.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                className="col-span-3 font-normal"
                onChange={e => setCreateChannelName(e.target.value)}
                value={createChannelName}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="submit" onClick={createChannel}>Create Channel</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      ) : isLeaveOpen ? (
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Join Channel</DialogTitle>
            <DialogDescription>Enter the channel ID for the channel you want to join.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Channel ID
              </Label>
              <Input
                id="name"
                className="col-span-3 font-normal"
                onChange={e => setJoinChannelName(e.target.value)}
                value={joinChannelName}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="submit" onClick={joinChannel}>Join Channel</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      ) : null}
    </Dialog>
  );
}
