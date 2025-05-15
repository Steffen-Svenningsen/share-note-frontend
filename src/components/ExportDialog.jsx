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
    
    // Define explicit heading styles
    const headingStyles = {
      'h1': '2em',    // Heading 1
      'h2': '1.5em',  // Heading 2
      'h3': '1.17em', // Heading 3
      'h4': '1em',    // Heading 4
      'h5': '0.83em', // Heading 5
      'h6': '0.67em'  // Heading 6
    };
    
    // Process the clone to ensure black text for elements without explicit color
    // and to fix heading sizes
    const processNodes = (node) => {
      if (node.nodeType === Node.TEXT_NODE && node.parentNode) {
        if (!node.parentNode.style.color && !node.parentNode.classList.contains('ql-color-')) {
          // No explicit color, set to black for printing
          node.parentNode.style.color = '#000000';
        }
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        // Fix heading sizes
        const tagName = node.tagName.toLowerCase();
        if (headingStyles[tagName]) {
          node.style.fontSize = headingStyles[tagName];
        }
        
        // Process child nodes
        node.childNodes.forEach(processNodes);
      }
    };    
    processNodes(contentClone);
    
    // Additional processing for Quill-specific heading formats
    // Quill often uses <p> tags with class names for headings
    const headingClasses = contentClone.querySelectorAll('.ql-size-large, .ql-size-huge, .ql-header-1, .ql-header-2, .ql-header-3, .ql-header-4, .ql-header-5, .ql-header-6');
    headingClasses.forEach(element => {
      if (element.classList.contains('ql-header-1')) {
        element.style.fontSize = '2em';
      } else if (element.classList.contains('ql-header-2')) {
        element.style.fontSize = '1.5em';
      } else if (element.classList.contains('ql-header-3')) {
        element.style.fontSize = '1.17em';
      } else if (element.classList.contains('ql-header-4')) {
        element.style.fontSize = '1em';
      } else if (element.classList.contains('ql-header-5')) {
        element.style.fontSize = '0.83em';
      } else if (element.classList.contains('ql-header-6')) {
        element.style.fontSize = '0.67em';
      }
    });
    
    // Also check for heading attributes in Quill format
    const headingAttributes = contentClone.querySelectorAll('[data-header]');
    headingAttributes.forEach(element => {
      const headerLevel = element.getAttribute('data-header');
      if (headerLevel && !isNaN(parseInt(headerLevel))) {
        const level = parseInt(headerLevel);
        if (level >= 1 && level <= 6) {
          element.style.fontSize = headingStyles[`h${level}`];
        }
      }
    });
    
    const options = {
      margin: 10,
      filename: documentTitle ? documentTitle : 'share-note',
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
