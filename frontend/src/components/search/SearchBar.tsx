"use client"

import { Search } from "lucide-react"
import { useRouter } from "next/navigation"
import { useSearchDropdown } from "@/hooks/navBar/useSearchDropdown"
import SearchDropdown from "./SearchDropdown"
import { useFilteredProducts } from "@/hooks/search/useFilteredProducts"
import { useMediaQuery } from "react-responsive"

export default function SearchBar() {
    const router = useRouter()
    const { searchTerm, setSearchTerm, filteredProducts } =
        useFilteredProducts()

    const { inputRef, showDropdown, setShowDropdown } = useSearchDropdown()

    const isDesktopBetween = useMediaQuery({ minWidth: 1024, maxWidth: 1280 })

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            const query = searchTerm.trim()
            if (!query) return
            router.push(`/search?query=${encodeURIComponent(query)}`)
            setShowDropdown(false)
        }
    }

    return (
        <div
            className="nav__bar__aside--inputContainer"
            style={{ position: "relative" }}
            ref={inputRef}
        >
            <Search />

            <input
                type="text"
                placeholder={`Procurar suplementos${
                    !isDesktopBetween ? ", acessórios" : ""
                }...`}
                value={searchTerm}
                onChange={(e) => {
                    setSearchTerm(e.target.value)
                    setShowDropdown(true)
                }}
                onFocus={() => {
                    if (searchTerm.length > 0) setShowDropdown(true)
                }}
                onKeyDown={handleKeyDown}
            />

            {showDropdown && (
                <SearchDropdown
                    searchTerm={searchTerm}
                    filteredProducts={filteredProducts}
                    onItemClick={() => setShowDropdown(false)}
                />
            )}
        </div>
    )
}
