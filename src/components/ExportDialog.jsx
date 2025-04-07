import { Button, HStack, Input } from "@chakra-ui/react"
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
import { useState } from "react"

const ExportDialog = () => {
  const [documentTitle, setDocumentTitle] = useState('Untitled document')

  const exportAsPDF = () => {
    const editorContent = document.querySelector('.ql-editor');
    
    if (!editorContent) {
      console.error("Editor content not found");
      return;
    }
    
    // Clone the editor content
    const contentClone = editorContent.cloneNode(true);
    
    // Process the clone to ensure black text for elements without explicit color
    const processTextNodes = (node) => {
      if (node.nodeType === Node.TEXT_NODE && node.parentNode) {
        if (!node.parentNode.style.color && !node.parentNode.classList.contains('ql-color-')) {
          // No explicit color, set to black for printing
          node.parentNode.style.color = '#000000';
        }
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        // Process child nodes
        node.childNodes.forEach(processTextNodes);
      }
    };    
    processTextNodes(contentClone);
    
    const options = {
      margin: 10,
      filename: documentTitle,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { 
        scale: 2,
        useCORS: true,
        letterRendering: true
      },
      jsPDF: { 
        unit: 'mm', 
        format: 'a4', 
        orientation: 'portrait'
      }
    };
    
    html2pdf().set(options).from(contentClone).save();
  }

  const handleTitleChange = (e) => {
    setDocumentTitle(e.target.value);
  };

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
          <Input 
            placeholder="Name your file"
            value={documentTitle}
            onChange={handleTitleChange}
            mb={4}
          />
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
