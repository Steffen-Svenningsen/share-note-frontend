import { Button, HStack } from "@chakra-ui/react"
import {
    DialogRoot,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogCloseTrigger,
    DialogFooter,
    DialogBody,
    DialogActionTrigger,
} from "./ui/dialog"
import { Share2, PartyPopper, ClipboardCheck, Clipboard } from "lucide-react"
import { useState, useEffect } from "react"

const InviteDialog = () => {

    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (copied) {
            const timer = setTimeout(() => {
                setCopied(false)
            }, 3000)
            return () => clearTimeout(timer)
        }
    }, [copied])

    const copyLinkToClipboard = () => {
        // Get the current URL or construct the URL with the document ID
        const shareUrl = window.location.href;
        
        // Copy to clipboard
        navigator.clipboard.writeText(shareUrl)
          .then(() => {
            setCopied(true);
          })
          .catch((err) => {
            console.error('Failed to copy: ', err);
          });
      };

  return (
    <DialogRoot>
      <DialogTrigger asChild>
        <Button colorPalette={"gray"} size={"sm"}>
            <Share2 />
            Invite others
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <HStack>
                Invite others to collaborate
                <PartyPopper />
            </HStack>
          </DialogTitle>
        </DialogHeader>
        <DialogBody>
          <p>
            Simply share this link with others to invite them to collaborate on this document. Everybody with the link will be able to view and edit the document.
          </p>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="outline">Cancel</Button>
          </DialogActionTrigger>
          <Button onClick={copyLinkToClipboard}>{copied ? (<>Link copied! <ClipboardCheck /></>) : (<>Copy link <Clipboard /></>)}</Button>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  )
}

export default InviteDialog
