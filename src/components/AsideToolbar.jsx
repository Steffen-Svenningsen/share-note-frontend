import "../styles/aside.css"
import { Button } from "@chakra-ui/react"
import { Toaster, toaster } from "./ui/toaster"
import { ZoomIn, ZoomOut, Pen, Type } from "lucide-react"
import { useState } from "react"


export default function AsideToolbar() {
    const [zoomLevel, setZoomLevel] = useState(100)
    
    const zoomIn = () => {
        if (zoomLevel < 150) {
            const newZoom = zoomLevel + 10
            setZoomLevel(newZoom)
            applyZoom(newZoom)
            toaster.create({
                title: "Zoom level:",
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
                title: "Zoom level:",
                description: `${newZoom}%`,
            })
        }
    }

    const applyZoom = (zoom) => {

        const editorContainer = document.querySelector('.ql-container')
        const editorWrapper = editorContainer?.parentElement;

        if (editorContainer) {
            editorContainer.style.transform = `scale(${zoom / 100})`
            editorContainer.style.transformOrigin = "top center"

            if (editorWrapper) {
                const contentHeight = editorContainer.scrollHeight
                const newHeight = contentHeight * (zoom / 100)

                if (zoom >= 100) {
                    editorWrapper.style.minHeight = `calc(${newHeight}px + 3rem)`
                } else {
                    const newHeight = contentHeight * (zoom / 100)
                    editorWrapper.style.height = `calc(${newHeight}px + 3rem)`
                    editorContainer.style.height = "unset !important"
                }
                editorWrapper.style.overflowY = "visible"
            }
        }
    }

    return (
        <>
            <aside>
                <div className="zoom-controls">
                    <Button variant={'ghost'} className="zoom-out" onClick={zoomOut} aria-label="Zoom out">
                        <ZoomOut size={14} />
                    </Button>
                    <Button variant={'ghost'} className="zoom-in" onClick={zoomIn} aria-label="Zoom in">
                        <ZoomIn size={14} />
                    </Button>
                </div>
                <Button variant={'ghost'}>
                    <Pen size={14} />
                </Button>
                <Button variant={'ghost'}>
                    <Type size={14} />
                </Button>
            </aside>
            <Toaster />
        </>
    )
}
