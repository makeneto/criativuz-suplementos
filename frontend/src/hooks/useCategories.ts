"use client"

import { useRef, useState } from "react"
import useProducts from "@/hooks/useProducts"
import { MAIN_CATEGORIES } from "@/constants/categories"
import { Product } from "@/interfaces/interfaces"

export function useCategories() {
    const { data, isPending } = useProducts()
    const allProducts = data?.products || []

    const [openCategory, setOpenCategory] = useState<string | null>(null)
    const [openExtraCategory, setOpenExtraCategory] = useState<string | null>(
        null
    )
    const dropdownRef = useRef<HTMLDivElement>(null)

    const getProductsByCategory = (category: string) =>
        allProducts.filter(
            (p: Product) => p.category?.toLowerCase() === category.toLowerCase()
        )

    const formatCategory = (cat: string) => cat.replace(/-/g, " ")

    const allCategories = Array.from(
        new Set(allProducts.map((p: any) => p.category).filter(Boolean))
    )

    const extraCategories = allCategories.filter(
        (cat: any) => !MAIN_CATEGORIES.includes(cat.toLowerCase())
    )

    return {
        dropdownRef,
        openCategory,
        setOpenCategory,
        openExtraCategory,
        setOpenExtraCategory,
        getProductsByCategory,
        formatCategory,
        mainCategories: MAIN_CATEGORIES,
        extraCategories,
        isPending,
    }
}
