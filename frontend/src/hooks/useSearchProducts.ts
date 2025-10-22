"use client"

import useProducts from "@/hooks/useProducts"

export function useSearchProducts() {
    const { data, isPending } = useProducts()
    const products = data?.products || []

    return { products, isPending }
}
