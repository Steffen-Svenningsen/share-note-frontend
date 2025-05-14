/* eslint-disable react/prop-types */
import { Button, HStack } from "@chakra-ui/react"
import {
    DialogRoot,
    DialogTrigger,
    DialogContent,
    DialogHeader,
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
        
        const text = quill.getText();
        
        const index = text.toLowerCase().indexOf(searchQuery.toLowerCase());
        
        if (index !== -1) {
            quill.setSelection(index, searchQuery.length);
            
            const bounds = quill.getBounds(index);
            const editorElement = document.querySelector('.ql-editor');
            if (editorElement) {
                editorElement.scrollTop = bounds.top - 50;
            }
        } else {
            alert("No matches found");
        }
    };

    // Focus the input when dialog opens
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
                <DialogHeader>
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
                </DialogHeader>
                <DialogFooter>
                    <HStack className="keyboard-shortcut">
                        <span>esc</span> to close
                    </HStack>
                </DialogFooter>
            </DialogContent>
        </DialogRoot>
    )
}

export default SearchBar
