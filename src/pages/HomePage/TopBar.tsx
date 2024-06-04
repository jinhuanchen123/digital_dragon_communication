import {
  ChevronDown,
  UserPlus,
  Clipboard,
  Check,
  DoorOpen,
  BellPlus,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
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
import { useState, useEffect } from "react";
import { DropdownMenuGroup } from "@radix-ui/react-dropdown-menu";
import {
  doc,
  getDoc,
  updateDoc,
  collection,
  getDocs,
  query,where
} from "firebase/firestore";
import { db, auth } from "../Firebase/firebase.ts";
import { getAuth } from "firebase/auth";


export default function TopBar(props: any) {
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [isLeaveOpen, setIsLeaveOpen] = useState(false);
  const [isMuteOpen, setIsMuteOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [channelName, setChannelName] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState(props.selectedChannel);
  const [isMuted, setIsMuted] = useState(false);
  const [muteStatusID, setMuteStatusID] = useState("");

  useEffect(() => {
    setSelectedChannel(props.selectedChannel);
    if (props.selectedChannel) {
      getChannelName();
    
    }
  }, [props.selectedChannel]);

  function onCopy() {
    setIsCopied(true);
    navigator.clipboard.writeText(selectedChannel);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  }

  //find doc.channelName of selected channel
  async function getChannelName() {
    if (selectedChannel) {
      const docRef = doc(db, "text_channels", selectedChannel);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setChannelName(() => data.channelName);
      }


    }
  }
  getChannelName();

  async function onLeaveChannel() {
    //get array of members into variable
    const docRef = doc(db, "text_channels", selectedChannel);
    const docSnap = await getDoc(docRef);
    let membersArray;
    if (docSnap.exists()) {
      const data = docSnap.data();
      console.log(data);
      membersArray = data.members;
    }
    //get userID
    const auth = getAuth();
    if (!auth.currentUser) {
      console.error("User not found");
      return;
    }
    const userID = auth.currentUser.uid;

    //remove user from array
    for (let i = 0; i < membersArray.length; i++) {
      if (membersArray[i] == userID) {
        membersArray.splice(i, 1);
      }
    }
    //update array of members in database
    const textChannelRef = doc(db, "text_channels", selectedChannel);
    await updateDoc(textChannelRef, {
      members: membersArray,
    });

    //reset selectedChannel
    setSelectedChannel(() => []);
    props.onSelectChannel();
  }
  async function toggleMute(channelId: string) {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        console.error("Current user not found");
        return;
      }
      const userID = currentUser.uid;
  
      const muteStatusesRef = collection(
        db,
        "text_channels",
        channelId, // Use the channelId to target the specific channel
        "muteStatuses"
      );
  
      // Find the document related to the current user
      const userMuteStatusQuery = query(
        muteStatusesRef,
        where("uid", "==", userID)
      );
      const querySnapshot = await getDocs(userMuteStatusQuery);
  
      if (querySnapshot.empty) {
        console.error("No mute status found for the user in this channel.");
        return;
      }
  
      // Assuming there's only one document per user
      const doc = querySnapshot.docs[0];
      const currentMuteStatus = doc.data().muteStatus;
      const newMuteStatus = currentMuteStatus === "mute" ? "unmute" : "mute";
  
      const docRef = doc.ref;
      await updateDoc(docRef, { muteStatus: newMuteStatus });
  
      console.log("Document updated successfully!");
  
      // Update isMuted state
      setIsMuted((prevIsMuted) => !prevIsMuted);
    } catch (error) {
      console.error("Error updating document:", error);
    }
  }
  
  

  return (
    <div>
      {selectedChannel && (
        <Dialog
          open={isInviteOpen || isLeaveOpen}
          onOpenChange={isInviteOpen ? setIsInviteOpen : setIsLeaveOpen}
        >
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost">
                <span className="mr-2 text-2xl">{channelName}</span>
                <ChevronDown className="mt-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Channel Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => setIsInviteOpen(true)}>
                  <Button variant="ghost">
                    <UserPlus className="mr-2 h-4 w-4" />
                    <span>Invite People</span>
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
              {/* <DropdownMenuItem onClick={() => toggleMute(selectedChannel)}>
  <Button variant="ghost">
    <BellPlus className="mr-2 h-4 w-4" />
    <span>
      {isMuted ? "Unmute Notification" : "Mute Notification"}
    </span>
  </Button>
</DropdownMenuItem> */}

                {/* <DropdownMenuSeparator /> */}
                <DropdownMenuItem onClick={() => setIsLeaveOpen(true)}>
                  <Button
                    variant="ghost"
                    className="text-red-600 hover:text-red-600"
                  >
                    <DoorOpen className="mr-2 h-4 w-4" />
                    <span>Leave Channel</span>
                  </Button>
                  <DropdownMenuSeparator />
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          {isInviteOpen ? (
            <>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Share link</DialogTitle>
                  <DialogDescription>
                    Send this channel ID to a colleague.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                  <div className="grid flex-1 gap-2">
                    <Label htmlFor="link" className="sr-only">
                      Link
                    </Label>
                    <Input id="link" defaultValue={selectedChannel} readOnly />
                  </div>
                  <Button onClick={onCopy} size="sm" className="px-3">
                    <span className="sr-only">Copy</span>
                    {isCopied ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Clipboard className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <DialogFooter className="sm:justify-start">
                  <DialogClose asChild>
                    <Button type="button" variant="secondary">
                      Close
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </>
          ) : isLeaveOpen ? (
            <>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Leave channel</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to leave this channel?
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="sm:justify-end">
                  <DialogClose asChild>
                    <Button type="button" variant="secondary">
                      Cancel
                    </Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button
                      onClick={onLeaveChannel}
                      type="submit"
                      variant="destructive"
                    >
                      Leave Channel
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </>
          ) : null}
        </Dialog>
      )}
    </div>
  );
}
