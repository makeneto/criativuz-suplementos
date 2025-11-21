"use client"

import { useEffect, useRef, useState } from "react"
import { useSearchProducts } from "@/hooks/search/useSearchProducts"

export function useFilteredProducts() {
    const { products, isPending } = useSearchProducts()
    const [searchTerm, setSearchTerm] = useState("")
    const [showSearchDropdown, setShowSearchDropdown] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)

    const filteredProducts =
        searchTerm.length > 0 && Array.isArray(products)
            ? products.filter((p: any) => {
                  const term = searchTerm.toLowerCase()
                  return (
                      p.name?.toLowerCase().includes(term) ||
                      p.category?.toLowerCase().includes(term) ||
                      p.brand?.toLowerCase().includes(term)
                  )
              })
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
        isPending,
    }
}
