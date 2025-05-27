import '../styles/aside.css'
import { Button } from '@chakra-ui/react'
import { Toaster, toaster } from './ui/toaster'
import { ZoomIn, ZoomOut, Type, Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'

export default function AsideToolbar() {
  const [zoomLevel, setZoomLevel] = useState(100)
  const [mainControls, setMainControls] = useState(true)

  const handleControls = () => {
    setMainControls(prev => !prev)
  }

  const zoomIn = () => {
    if (zoomLevel < 150) {
      const newZoom = zoomLevel + 10
      setZoomLevel(newZoom)
      applyZoom(newZoom)
      toaster.create({
        title: 'Zoom level:',
        description: `${newZoom}%`,
      })
    }
  }

  const zoomOut = () => {
    if (zoomLevel > 50) {
      const newZoom = zoomLevel - 10
      setZoomLevel(newZoom)
      applyZoom(newZoom)
      toaster.create({
        title: 'Zoom level:',
        description: `${newZoom}%`,
      })
    }
  }

  const applyZoom = zoom => {
    const editorContainer = document.querySelector('.ql-editor')
    const editorWrapper = editorContainer?.parentElement

    if (editorContainer) {
      editorContainer.style.transform = `scale(${zoom / 100})`
      editorContainer.style.transformOrigin = 'top center'

      if (editorWrapper) {
        const contentHeight = editorContainer.scrollHeight
        const newHeight = contentHeight * (zoom / 100)

        if (zoom >= 100) {
          editorWrapper.style.minHeight = `calc(${newHeight}px + 3rem)`
        } else {
          const newHeight = contentHeight * (zoom / 100)
          editorWrapper.style.height = `calc(${newHeight}px + 3rem)`
          editorContainer.style.height = 'unset !important'
        }
        editorWrapper.style.overflowY = 'visible'
      }
    }
  }

  const addNewLine = () => {
    const quill = window.quill
    if (!quill) {
      return
    }

    const length = quill.getLength()

    quill.insertText(length, '\n')

    quill.setSelection(length + 1, 0)

    quill.focus()

    const bounds = quill.getBounds(length + 1)
    const editorElement = document.querySelector('.ql-editor')

    if (editorElement) {
      editorElement.scrollTop = bounds.top - editorElement.clientHeight / 2
    }
  }
  return (
    <>
      <aside>
        {mainControls && (
          <div className="aside-item-wrapper main-controls">
            <div className="zoom-controls">
              <Button
                variant={'ghost'}
                className="zoom-out"
                onClick={zoomOut}
                aria-label="Zoom out"
              >
                <ZoomOut size={14} />
              </Button>
              <Button
                variant={'ghost'}
                className="zoom-in"
                onClick={zoomIn}
                aria-label="Zoom in"
              >
                <ZoomIn size={14} />
              </Button>
            </div>
            {/* <Button variant={'ghost'}>
              <Pen size={14} />
            </Button> */}
            <Button variant={'ghost'} onClick={addNewLine}>
              <Type size={14} />
            </Button>
          </div>
        )}
        <div className="aside-item-wrapper">
          <Button
            onClick={handleControls}
            aria-label="Toggle controls"
            variant={'ghost'}
            className="menu-trigger"
          >
            {mainControls ? <Eye size={14} /> : <EyeOff size={14} />}
          </Button>
        </div>
      </aside>
      <Toaster />
    </>
  )
}
