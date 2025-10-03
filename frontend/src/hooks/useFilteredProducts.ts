"use client"

import { useEffect, useRef, useState } from "react"
import { useSearchProducts } from "@/hooks/useSearchProducts"

export function useFilteredProducts() {
    const products = useSearchProducts()
    const [searchTerm, setSearchTerm] = useState("")
    const [showSearchDropdown, setShowSearchDropdown] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)

    const filteredProducts =
        searchTerm.length > 0
            ? products.filter((p) =>
                  p.name?.toLowerCase().includes(searchTerm.toLowerCase())
              )
            : []

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                inputRef.current &&
                !inputRef.current.contains(event.target as Node)
            ) {
                setShowSearchDropdown(false)
            }
        }
        if (showSearchDropdown) {
            document.addEventListener("mousedown", handleClickOutside)
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [showSearchDropdown])

    return {
        inputRef,
        searchTerm,
        setSearchTerm,
        showSearchDropdown,
        setShowSearchDropdown,
        filteredProducts,
    }
}
