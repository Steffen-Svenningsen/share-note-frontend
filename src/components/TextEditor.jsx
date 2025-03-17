import Quill from "quill"
import ImageResize from "quill-image-resize-module-react"
import "quill/dist/quill.snow.css"
import { useCallback, useEffect, useState } from "react"
import { io } from "socket.io-client"
import { useParams } from "react-router-dom"
import "../styles/quill-custom-fonts.css"
import "../styles/quill-custom.css"

const FontAttributor = Quill.import('attributors/class/font');
FontAttributor.whitelist = ['arial', 'roboto', 'lato', 'noto', 'open', 'inter'];
Quill.register(FontAttributor, true);

const ColorClass = Quill.import('attributors/class/color');
const ColorStyle = Quill.import('attributors/style/color');
Quill.register(ColorClass, true);
Quill.register(ColorStyle, true);

Quill.register('modules/imageResize', ImageResize);

const Font = Quill.import('formats/font');
const Size = Quill.import('formats/size');
const Bold = Quill.import('formats/bold');
const Italic = Quill.import('formats/italic');
const Underline = Quill.import('formats/underline');
const Strike = Quill.import('formats/strike');
const Blockquote = Quill.import('formats/blockquote');
const CodeBlock = Quill.import('formats/code-block');
const Header = Quill.import('formats/header');
const Indent = Quill.import('formats/indent');
const List = Quill.import('formats/list');
const Align = Quill.import('formats/align');
const Script = Quill.import('formats/script');
const Link = Quill.import('formats/link');
const Image = Quill.import('formats/image');
const Video = Quill.import('formats/video');
const Formula = Quill.import('formats/formula');

Quill.register({
    'formats/font': Font,
    'formats/size': Size,
    'formats/bold': Bold,
    'formats/italic': Italic,
    'formats/underline': Underline,
    'formats/strike': Strike,
    'formats/blockquote': Blockquote,
    'formats/code-block': CodeBlock,
    'formats/header': Header,
    'formats/indent': Indent,
    'formats/list': List,
    'formats/align': Align,
    'formats/script': Script,
    'formats/link': Link,
    'formats/image': Image,
    'formats/video': Video,
    'formats/formula': Formula,
}, true);

const toolbarOptions = [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: FontAttributor.whitelist }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    [{ align: [] }],
    [{ indent: "-1" }, { indent: "+1" }],
    ["link", "image", "video", "formula", "blockquote", "code-block"],
    ["clean"],
]

const saveIntervalTime = 2000


export default function TextEditor() {
    const {id: documentId} = useParams()
    const [socket, setSocket] = useState()
    const [quill, setQuill] = useState()

    useEffect(() => {
        const s = io(import.meta.env.VITE_API_URL || (window.location.hostname === 'localhost' ? '/' : 'http://localhost:3001'))
        setSocket(s)

        return () => {
            s.disconnect()
        }
    }, [])

    useEffect(() => {
        if (socket == null || quill == null) return

        socket.once('load-document', document => {
            quill.setContents(document)
            quill.enable()
        })

        socket.emit('get-document', documentId)
    }, [socket, quill, documentId])

    useEffect(() => {
        if (socket == null || quill == null) return

        const interval = setInterval(() => {
            socket.emit('save-document', quill.getContents())
        }, saveIntervalTime)

        return () => {
            clearInterval(interval)
        }
    }, [socket, quill])

    useEffect(() => {
        if (socket == null || quill == null) return

        const handler = (delta, oldDelta, source) => {
            if (source !== 'user') return
            socket.emit("send-changes", delta)
        }

        quill.on('text-change', handler)

        return () => {
            quill.off('text-change', handler)
        }
    }, [socket, quill])

    useEffect(() => {
        if (socket == null || quill == null) return
        
        const handler = delta => {
            quill.updateContents(delta)
        }

        socket.on('receive-changes', handler)

        return () => {
            socket.off('receive-changes', handler)
        }
    }, [socket, quill])

    useEffect(() => {
        if (quill == null) return;
        
        const editorElement = document.querySelector('.ql-editor');
        if (editorElement) {
            editorElement.setAttribute('data-default-color', '#000000');
        }
    }, [quill]);

    const wrapperRef = useCallback((wrapper) => {
        if (wrapper == null) return

        wrapper.innerHTML = ""
        const editor = document.createElement('div')
        wrapper.append(editor)
        const q = new Quill(editor, {
            theme: "snow", 
            modules: { 
                toolbar: toolbarOptions,
                imageResize: {
                    displaySize: true,
                    displayStyles: true,
                    modules: ['Resize', 'DisplaySize', 'Toolbar']
                }
                
            },
            formats: [
                'header', 'font', 'size', 'bold', 'italic', 'underline', 'strike',
                'color', 'background', 'script', 'list', 'bullet', 'indent',
                'align', 'direction', 'link', 'image', 'video', 'formula',
                'blockquote', 'code-block'
            ]
        })

        const editorElement = q.root;
        editorElement.style.color = '#000000';
        
        editorElement.classList.add('default-black-text');
        q.disable()
        q.setText('Loading...')
        setQuill(q)
    }, [])
    return (
        <div id="container" ref={wrapperRef}></div>
    )
}
