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
import { useState } from "react";

export default function LeftChannelBar() {
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [isLeaveOpen, setIsLeaveOpen] = useState(false);

  return (
    <div>
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
          <>
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
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Create Channel</Button>
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
                  <Button type="submit" variant="destructive">
                    Leave Channel
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </>
        ) : null}
      </Dialog>
    </div>
  );
}
