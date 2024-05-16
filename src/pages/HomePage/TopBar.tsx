import {
  ChevronDown,
  UserPlus,
  Clipboard,
  Check,
  DoorOpen,
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
import { useState } from "react";
import { DropdownMenuGroup } from "@radix-ui/react-dropdown-menu";

export default function TopBar() {
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [isLeaveOpen, setIsLeaveOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  function onCopy() {
    setIsCopied(true);
    navigator.clipboard.writeText("TODO: link-to-channel");
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  }
 

  return (
    <div>
      <Dialog
        open={isInviteOpen || isLeaveOpen}
        onOpenChange={isInviteOpen ? setIsInviteOpen : setIsLeaveOpen}
      >
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost">
              <span className="mr-2 text-2xl">Digital Dragons</span>
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
              <DropdownMenuItem onClick={() => setIsLeaveOpen(true)}>
                <Button
                  variant="ghost"
                  className="text-red-600 hover:text-red-600"
                >
                  <DoorOpen className="mr-2 h-4 w-4" />
                  <span>Leave Channel</span>
                </Button>
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
                  Send a channel invite link to a colleague.
                </DialogDescription>
              </DialogHeader>
              <div className="flex items-center space-x-2">
                <div className="grid flex-1 gap-2">
                  <Label htmlFor="link" className="sr-only">
                    Link
                  </Label>
                  <Input
                    id="link"
                    defaultValue="TODO: link-to-channel"
                    readOnly
                  />
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
