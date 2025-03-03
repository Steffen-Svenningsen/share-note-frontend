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
import { Download } from "lucide-react"
import html2pdf from "html2pdf.js"

const ExportDialog = () => {
  const exportAsPDF = () => {
    const editorContent = document.querySelector('.ql-editor');
    
    if (!editorContent) {
      console.error("Editor content not found");
      return;
    }
    
    const options = {
      margin: 10,
      filename: 'share-note-document.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    
    html2pdf().set(options).from(editorContent).save();
  }

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
          <DialogTitle>
            <HStack>
              Export as PDF
              <Download />
            </HStack>
          </DialogTitle>
        </DialogHeader>
        <DialogBody>
          <p>
            Save your document as a PDF by clicking the button below.
          </p>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="outline">Cancel</Button>
          </DialogActionTrigger>
          <Button onClick={exportAsPDF}>Save as PDF</Button>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  )
}

export default ExportDialog
