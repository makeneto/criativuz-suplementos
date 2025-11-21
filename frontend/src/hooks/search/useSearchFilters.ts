"use client"

import { USER_GOALS } from "@/constants/userGoals"
import { useEffect, useMemo, useState } from "react"
import { useQueryFilter } from "./useQueryFilter"
import { useDerivedOptions } from "./useDerivedOptions"
import { usePriceFilter } from "./usePriceFilter"
import { useFinalFilter } from "./useFinalFilter"

export function useSearchFilters(allProducts: any[], query: string) {
    const [selectedFlavor, setSelectedFlavor] = useState<string | null>(null)
    const [sortBy, setSortBy] = useState<string | null>(null)
    const [currentPrice, setCurrentPrice] = useState(0)
    const [selectedMaxPrice, setSelectedMaxPrice] = useState(0)
    const [selectedGoals, setSelectedGoals] = useState<string[]>([])
    const [selectedBrands, setSelectedBrands] = useState<string[]>([])
    const [selectedCategory, setSelectedCategory] = useState<string | null>(
        null
    )

    // 1️⃣ Filter products by query
    const filteredByQuery = useQueryFilter(allProducts, query)

    // 2️⃣ Calculate options derivados (flavors, brands, categories)
    const { flavorOptions, allBrands } = useDerivedOptions(filteredByQuery)

    // 3️⃣ Priceless final filtration
    const prePriceFilteredProducts = useFinalFilter(
        filteredByQuery,
        selectedGoals,
        selectedBrands,
        selectedCategory,
        selectedFlavor
    )

    // 4️⃣ Price
    const { maxPrice, finalProducts } = usePriceFilter(
        prePriceFilteredProducts,
        selectedMaxPrice,
        setCurrentPrice,
        setSelectedMaxPrice
    )

    // 5️⃣ Ordering
    const sortedProducts = useMemo(() => {
        const sorted = [...finalProducts]
        if (sortBy === "Preço, baixo ao alto") {
            sorted.sort(
                (a, b) =>
                    Math.min(
                        ...(Array.isArray(a.price) ? a.price : [a.price])
                    ) -
                    Math.min(...(Array.isArray(b.price) ? b.price : [b.price]))
            )
        }
        if (sortBy === "Preço, alto ao baixo") {
            sorted.sort(
                (a, b) =>
                    Math.min(
                        ...(Array.isArray(b.price) ? b.price : [b.price])
                    ) -
                    Math.min(...(Array.isArray(a.price) ? a.price : [a.price]))
            )
        }
        return sorted
    }, [finalProducts, sortBy])

    const categoryOptions = useMemo(
        () => [
            "Todas",
            ...Array.from(
                new Set(
                    prePriceFilteredProducts
                        .map((p) => p.category)
                        .filter(Boolean)
                )
            ),
        ],
        [prePriceFilteredProducts]
    )

    return {
        selectedFlavor,
        setSelectedFlavor,
        sortBy,
        setSortBy,
        currentPrice,
        setCurrentPrice,
        selectedMaxPrice,
        setSelectedMaxPrice,
        selectedGoals,
        setSelectedGoals,
        selectedBrands,
        setSelectedBrands,
        selectedCategory,
        setSelectedCategory,
        flavorOptions,
        allBrands,
        categoryOptions,
        maxPrice,
        sortedProducts,
    }
}
