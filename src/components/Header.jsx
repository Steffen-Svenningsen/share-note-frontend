import logo from '../assets/images/share_note_logo_black.png'
import InviteDialog from './InviteDialog'
import ExportDialog from './ExportDialog'
import SearchBar from './SearchBar'
import { useEffect, useState } from 'react'
import { Menu, Button, Portal } from '@chakra-ui/react'

export default function Header() {
  const [hamburgerMenu, setHamburgerMenu] = useState(true)

  useEffect(() => {
    const handleResize = () => {
      setHamburgerMenu(window.innerWidth < 738)
    }

    handleResize()

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  })

  return (
    <header>
      <div className="header-content">
        <a href="/">
          <img src={logo} width={220} alt="Share Note" />
        </a>
        {hamburgerMenu ? (
          <Menu.Root>
            <Menu.Trigger asChild>
              <Button
                className="hamburger-menu-btn"
                colorPalette={'gray'}
                size="sm"
              >
                Menu
              </Button>
            </Menu.Trigger>
            <Portal>
              <Menu.Positioner>
                <Menu.Content>
                  <div className="mobile-menu">
                    <SearchBar showShortcut={false}></SearchBar>
                    <InviteDialog></InviteDialog>
                    <ExportDialog></ExportDialog>
                  </div>
                </Menu.Content>
              </Menu.Positioner>
            </Portal>
          </Menu.Root>
        ) : (
          <div className="btn-container desktop-menu">
            <SearchBar showShortcut></SearchBar>
            <InviteDialog></InviteDialog>
            <ExportDialog></ExportDialog>
          </div>
        )}
      </div>
    </header>
  )
}
