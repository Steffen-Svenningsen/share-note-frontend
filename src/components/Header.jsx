import logo from '../assets/images/share_note_logo_black.png'
import InviteDialog from "./InviteDialog"
import ExportDialog from "./ExportDialog"

export default function Header() {
  return (
    <header>
      <div className="header-content">
        <a href="/">
            <img src={logo} width={220} alt="Share Note" />
        </a>
        <div className="btn-container">
            <InviteDialog></InviteDialog>
            <ExportDialog></ExportDialog>
        </div>
      </div>
    </header>
  )
}
