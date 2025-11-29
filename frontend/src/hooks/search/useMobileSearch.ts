import { useRef, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useFilteredProducts } from "@/hooks/search/useFilteredProducts"
import { useSearchDropdown } from "@/hooks/navBar/useSearchDropdown"

export function useMobileSearch() {
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const searchRef = useRef<HTMLDivElement | null>(null)
    const inputRef = useRef<HTMLInputElement | null>(null)

    const router = useRouter()
    const { searchTerm, setSearchTerm, filteredProducts } =
        useFilteredProducts()
    const { showDropdown, setShowDropdown } = useSearchDropdown()

    const openSearch = () => setIsSearchOpen(true)
    const closeSearch = () => {
        setIsSearchOpen(false)
        setShowDropdown(false)
        setSearchTerm("")
    }

    const executeSearch = () => {
        const query = searchTerm.trim()
        if (!query) return
        router.push(`/search?query=${encodeURIComponent(query)}`)
        closeSearch()
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") executeSearch()
    }

    useEffect(() => {
        if (isSearchOpen) inputRef.current?.focus()
    }, [isSearchOpen])

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (
                searchRef.current &&
                !searchRef.current.contains(e.target as Node)
            ) {
                closeSearch()
            }
        }
        if (isSearchOpen)
            document.addEventListener("mousedown", handleClickOutside)
        return () =>
            document.removeEventListener("mousedown", handleClickOutside)
    }, [isSearchOpen])

    return {
        isSearchOpen,
        searchRef,
        inputRef,
        searchTerm,
        setSearchTerm,
        filteredProducts,
        showDropdown,
        setShowDropdown,
        openSearch,
        closeSearch,
        executeSearch,
        handleKeyDown,
    }
}
