import { Button, HStack } from "@chakra-ui/react"
import {
    DialogRoot,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogBody,
} from "./ui/dialog"
import { Input } from "@chakra-ui/react"
import { Search } from "lucide-react"
import { useState, useEffect, useRef } from "react"

const SearchBar = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const inputRef = useRef(null);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
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
        
        try {
            // Try the standard window.find method
            const found = window.find(searchQuery, false, false, true, false, false, false);
            
            // If not found, alert the user
            if (!found) {
                alert('No matches found');
            }
        } catch (error) {
            console.error('Search error:', error);
            // Fallback for browsers that don't support window.find
            alert('Search functionality not supported in this browser');
        }
    };

    const handlePrevious = () => {
        if (searchQuery.trim() === '') return;
        try {
            window.find(searchQuery, false, true, true, false, false, false);
        } catch (error) {
            console.error('Search error:', error);
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
                    <span className="button-span">Ctrl/Cmd + K</span>
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
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    handleSearch();
                                }
                            }}
                        />
                    </form>
                </DialogHeader>
                <DialogBody>
                    <HStack spacing={2} justifyContent="flex-end">
                        <Button variant={"subtle"} className="previous-button" onClick={handlePrevious} size="sm">Previous</Button>
                        <Button variant={"subtle"} className="next-button" onClick={handleSearch} size="sm">Next</Button>
                    </HStack>
                </DialogBody>
                <DialogFooter>
                    <HStack className="keyboard-shortcut"><span>esc</span> to close</HStack>
                </DialogFooter>
            </DialogContent>
        </DialogRoot>
    )
}

export default SearchBar
