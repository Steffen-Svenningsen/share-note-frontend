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
        
        //search logic
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
                        <Input 
                            id="search-input"
                            ref={inputRef}
                            placeholder="Search your file..." 
                            value={searchQuery} 
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </form>
                </DialogHeader>
                <DialogFooter>
                    <HStack className="keyboard-shortcut"><span>esc</span> to close</HStack>
                </DialogFooter>
            </DialogContent>
        </DialogRoot>
    )
}

export default SearchBar
