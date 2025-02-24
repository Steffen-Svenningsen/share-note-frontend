import { Button } from "@chakra-ui/react"
import logo from '../assets/images/share_note_logo_black.png'
import { Share2, Download } from "lucide-react"

export default function Header() {
  return (
    <header>
        <a href="/">
            <img src={logo} width={220} alt="Share Note" />
        </a>
        <div className="btn-container">
            <Button colorPalette={"gray"} size={"sm"}><Share2 />Invite others</Button>
            <Button colorPalette={"gray"} size={"sm"}><Download />Export to PDF</Button>
        </div>
    </header>
  )
}
