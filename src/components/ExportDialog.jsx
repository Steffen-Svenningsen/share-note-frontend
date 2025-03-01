import { Button } from "@chakra-ui/react"
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
import { Download } from "lucide-react"

const InviteDialog = () => {
  return (
    <DialogRoot>
      <DialogTrigger asChild>
        <Button colorPalette={"gray"} size={"sm"}>
          <Download />
          Export to PDF
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dialog Title</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="outline">Cancel</Button>
          </DialogActionTrigger>
          <Button>Save</Button>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  )
}

export default InviteDialog
