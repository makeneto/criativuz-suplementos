"use client"

import { useRef, useState } from "react"
import useProducts from "@/hooks/useProducts"
import { MAIN_CATEGORIES } from "@/constants/mainCategories"
import { Product } from "@/interfaces/interfaces"

export function useCategories() {
    const { data, isPending } = useProducts()
    const allProducts = data?.products || []

    const [openCategory, setOpenCategory] = useState<string | null>(null)

    const dropdownRef = useRef<HTMLDivElement>(null)

    const getProductsByCategory = (category: string) =>
        allProducts.filter(
            (p: Product) => p.category?.toLowerCase() === category.toLowerCase()
        )

    const formatCategory = (cat: string) => cat.replace(/-/g, " ")

    return {
        dropdownRef,
        openCategory,
        setOpenCategory,
        getProductsByCategory,
        formatCategory,
        mainCategories: MAIN_CATEGORIES,
        isPending,
    }
}
