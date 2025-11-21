"use client"

import { useRef, useState } from "react"
import useProducts from "@/hooks/product/useProducts"
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

    return {
        dropdownRef,
        openCategory,
        setOpenCategory,
        getProductsByCategory,
        mainCategories: MAIN_CATEGORIES,
        isPending,
    }
}
