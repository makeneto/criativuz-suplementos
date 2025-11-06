"use client"

import { Search, ArrowUpRight } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import SearchResultItem from "./SearchResultItem"
import { useFilteredProducts } from "@/hooks/useFilteredProducts"
import { Activity } from "react"

export default function SearchBar() {
    const router = useRouter()
    const {
        inputRef,
        searchTerm,
        setSearchTerm,
        showSearchDropdown,
        setShowSearchDropdown,
        filteredProducts,
    } = useFilteredProducts()

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            const query = searchTerm.trim()

            if (!query) return

            router.push(`/search?query=${encodeURIComponent(query)}`)
            setShowSearchDropdown(false)
        }
    }

    return (
        <div
            className="nav_bar__aside--inputContainer"
            style={{ position: "relative" }}
            ref={inputRef}
        >
            <Link href={`/search?query=${encodeURIComponent(searchTerm)}`}>
                <Search />
            </Link>
            <input
                type="text"
                placeholder="Procurar suplementos, acessórios..."
                value={searchTerm}
                onChange={(e) => {
                    setSearchTerm(e.target.value)
                    setShowSearchDropdown(true)
                }}
                onFocus={() => {
                    if (searchTerm.length > 0) setShowSearchDropdown(true)
                }}
                onKeyDown={handleKeyDown}
            />

            <Activity
                mode={
                    showSearchDropdown && searchTerm.length > 0
                        ? "visible"
                        : "hidden"
                }
            >
                <ul className="nav_bar__search-dropdown">
                    <Activity
                        mode={
                            filteredProducts.length > 0 ? "visible" : "hidden"
                        }
                    >
                        <h5>Produtos</h5>
                        {filteredProducts.slice(0, 4).map((prod: any) => (
                            <SearchResultItem
                                key={prod.id}
                                prod={prod}
                                onClick={() => setShowSearchDropdown(false)}
                            />
                        ))}
                    </Activity>

                    <Link
                        href={`/search?query=${encodeURIComponent(searchTerm)}`}
                        onClick={() => setShowSearchDropdown(false)}
                    >
                        <h6
                            className={
                                filteredProducts.length > 0
                                    ? "withProducts"
                                    : "noProducts"
                            }
                        >
                            <span>Pesquisar por "{searchTerm}"</span>
                            <ArrowUpRight />
                        </h6>
                    </Link>
                </ul>
            </Activity>
        </div>
    )
}
