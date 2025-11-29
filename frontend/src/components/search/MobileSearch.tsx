import { Search, X } from "lucide-react"
import SearchDropdown from "../search/SearchDropdown"

interface MobileSearchProps {
    searchRef: React.RefObject<HTMLDivElement | null>
    inputRef: React.RefObject<HTMLInputElement | null>
    searchTerm: string
    filteredProducts: any[]
    showDropdown: boolean
    setSearchTerm: (term: string) => void
    setShowDropdown: (val: boolean) => void
    handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void
    executeSearch: () => void
    closeSearch: () => void
}

export function MobileSearch({
    searchRef,
    inputRef,
    searchTerm,
    filteredProducts,
    showDropdown,
    setSearchTerm,
    setShowDropdown,
    handleKeyDown,
    executeSearch,
    closeSearch,
}: MobileSearchProps) {
    return (
        <div
            ref={searchRef}
            className="w-full flex gap-4 items-center justify-between"
        >
            <div className="flex-1 flex gap-4 items-center">
                <Search
                    className="w-5 h-5 text-red-100 hover:text-red-300 duration-200"
                    onClick={executeSearch}
                />
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search products..."
                    className="w-full flex-1 border-none bg-transparent outline-none text-base text-white placeholder:text-red-100"
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value)
                        setShowDropdown(e.target.value.trim().length > 0)
                    }}
                    onFocus={() => {
                        if (searchTerm.trim().length > 0) setShowDropdown(true)
                    }}
                    onKeyDown={handleKeyDown}
                />
                {searchTerm.trim().length > 0 && showDropdown && (
                    <SearchDropdown
                        searchTerm={searchTerm}
                        filteredProducts={filteredProducts}
                        onItemClick={() => setShowDropdown(false)}
                    />
                )}
            </div>
            <X
                onClick={closeSearch}
                className="text-red-100 hover:text-red-300 duration-200"
            />
        </div>
    )
}
