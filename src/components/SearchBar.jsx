import { Button, DialogDescription, HStack } from "@chakra-ui/react"
import {
    DialogRoot,
    DialogTrigger,
    DialogContent,
    DialogCloseTrigger,
    DialogTitle,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "./ui/dialog"
import { Input } from "@chakra-ui/react"
import { Search } from "lucide-react"
import { useState, useEffect, useRef } from "react"

const SearchBar = ({showShortcut = false}) => {
    const [searchQuery, setSearchQuery] = useState('');
    const inputRef = useRef(null);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'k' && (event.ctrlKey)) {
                event.preventDefault();
                document.getElementById('search-trigger').click();
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const handleSearch = (e) => {
        if (e) e.preventDefault();
        if (searchQuery.trim() === '') return;
        
        const quill = window.quill;
        if (!quill) {
            console.error("Quill instance not found");
            return;
        }
        
        const delta = quill.getContents();
        const searchTerm = searchQuery;
        
        const findInDelta = (delta, searchTerm) => {
            let currentIndex = 0;
            let matches = [];
            
            delta.ops.forEach(op => {
                if (typeof op.insert === 'string') {
                    const text = op.insert;
                    let textIndex = 0;
                    
                    while (textIndex < text.length) {
                        const matchPos = text.indexOf(searchTerm, textIndex);
                        if (matchPos === -1) break;
                        
                        matches.push({
                            index: currentIndex + matchPos,
                            length: searchTerm.length
                        });
                        
                        textIndex = matchPos + 1;
                    }
                    
                    currentIndex += text.length;
                } else {
                    currentIndex += 1;
                }
            });
            
            return matches;
        };
        
        const matches = findInDelta(delta, searchTerm);
        
        if (matches.length > 0) {
            const match = matches[0];
            
            quill.setSelection(match.index, match.length);
            
            setTimeout(() => {
                const selection = document.getSelection();
                if (selection && selection.rangeCount > 0) {
                    const range = selection.getRangeAt(0);
                    const rect = range.getBoundingClientRect();
                    
                    if (rect) {
                        const selectedElement = range.startContainer.parentElement;
                        if (selectedElement) {
                            selectedElement.scrollIntoView({
                                behavior: 'smooth',
                                block: 'center'
                            });
                        }
                    }
                }
            }, 100);
        }
    };

    const handleDialogOpen = () => {
        setTimeout(() => {
            if (inputRef.current) {
                inputRef.current.focus();
            }
        }, 100);
    };

    return (
        <DialogRoot onOpenChange={handleDialogOpen}>
            <DialogTrigger asChild id="search-trigger">
                <Button colorPalette={"gray"} size={"sm"}>
                    <Search />
                    Search
                    {showShortcut && <span className="button-span">Ctrl + K</span>}
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader className="search-header">
                    <DialogTitle>Search your file</DialogTitle>
                    <p>
                        Searches for the first instance of the search term in the document.
                    </p>
                </DialogHeader>
                <DialogBody>
                    <form onSubmit={handleSearch}>
                        <HStack>
                            <Input 
                                id="search-input"
                                ref={inputRef}
                                placeholder="Search your file..." 
                                value={searchQuery} 
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <Button type="submit" size="md">
                                Search
                            </Button>
                        </HStack>
                    </form>
                </DialogBody>
                <DialogFooter>
                    <HStack className="keyboard-shortcut ks-desktop">
                        <span>esc</span> to close
                    </HStack>
                    <HStack className="keyboard-shortcut ks-mobile">
                        <span>click</span> outside to close
                    </HStack>
                </DialogFooter>
                <DialogCloseTrigger />
            </DialogContent>
        </DialogRoot>
    )
}

export default SearchBar
