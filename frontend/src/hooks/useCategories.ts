"use client"

import { useEffect, useRef, useState } from "react"
import useProducts from "@/hooks/useProducts"
import { MAIN_CATEGORIES } from "@/constants/categories"
import { Product } from "@/interfaces/interfaces"

export function useCategories() {
    const [products, setProducts] = useState<Product[]>([])
    const [openCategory, setOpenCategory] = useState<string | null>(null)
    const [openExtraCategory, setOpenExtraCategory] = useState<string | null>(
        null
    )
    const dropdownRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        async function fetchProducts() {
            const result = await useProducts()
            setProducts(result?.all || [])
        }
        fetchProducts()
    }, [])

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setOpenCategory(null)
            }
        }
        if (openCategory)
            document.addEventListener("mousedown", handleClickOutside)
        return () =>
            document.removeEventListener("mousedown", handleClickOutside)
    }, [openCategory])

    const getProductsByCategory = (category: string) =>
        products.filter(
            (p) => p.category?.toLowerCase() === category.toLowerCase()
        )

    const formatCategory = (cat: string) => cat.replace(/-/g, " ")

    const allCategories = Array.from(
        new Set(products.map((p) => p.category).filter(Boolean))
    )
    const extraCategories = allCategories.filter(
        (cat) => !MAIN_CATEGORIES.includes(cat.toLowerCase())
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
    }
}
