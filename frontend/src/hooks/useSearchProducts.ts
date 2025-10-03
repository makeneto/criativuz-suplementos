"use client"

import { useEffect, useState } from "react"
import useProducts from "@/hooks/useProducts"

export function useSearchProducts() {
    const [products, setProducts] = useState<any[]>([])

    useEffect(() => {
        async function fetchProducts() {
            const result = await useProducts()
            setProducts(result?.all || [])
        }
        fetchProducts()
    }, [])

    return products
}
