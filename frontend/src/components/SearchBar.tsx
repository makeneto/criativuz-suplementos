"use client"

import { Search, ArrowUpRight } from "lucide-react"
import Link from "next/link"
import SearchResultItem from "./SearchResultItem"
import { useFilteredProducts } from "@/hooks/useFilteredProducts"

export default function SearchBar() {
    const {
        inputRef,
        searchTerm,
        setSearchTerm,
        showSearchDropdown,
        setShowSearchDropdown,
        filteredProducts,
    } = useFilteredProducts()

    return (
        <div
            className="nav_bar__aside--inputContainer"
            style={{ position: "relative" }}
            ref={inputRef}
        >
            <Search />
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
            />

            {showSearchDropdown && searchTerm.length > 0 && (
                <ul className="nav_bar__search-dropdown">
                    {filteredProducts.length > 0 && (
                        <>
                            <h5>Produtos</h5>
                            {filteredProducts.slice(0, 4).map((prod: any) => (
                                <SearchResultItem
                                    key={prod.id}
                                    prod={prod}
                                    onClick={() => setShowSearchDropdown(false)}
                                />
                            ))}
                        </>
                    )}

                    <Link href="/">
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
            )}
        </div>
    )
}
