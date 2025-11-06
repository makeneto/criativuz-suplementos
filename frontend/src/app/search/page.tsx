"use client"

import ProductCard from "@/components/ui/ProductCard"
import useProducts from "@/hooks/useProducts"
import { useSearchParams } from "next/navigation"
import { useEffect, useMemo } from "react"

export default function SearchPage() {
    const searchParams = useSearchParams()
    const query = (searchParams.get("query") || "").toLowerCase().trim()

    const { data, isPending } = useProducts()
    const allProducts = data?.products || []

    // Divide a query em termos, aceitando vírgulas ou espaços
    const searchTerms = useMemo(
        () => query.split(/[,\s]+/).filter((term) => term.length > 0),
        [query]
    )

    const filteredProducts = allProducts.filter((product: any) => {
        const name = product.name.toLowerCase()
        const category = product.category?.toLowerCase() || ""
        const brand = product.brand?.toLowerCase() || ""

        // Retorna true se qualquer termo for encontrado
        return searchTerms.some(
            (term) =>
                name.includes(term) ||
                category.includes(term) ||
                brand.includes(term)
        )
    })

    useEffect(() => {
        document.title = `Criativuz busca por ${query}`
    }, [query])

    if (isPending) return <p>Carregando...</p>

    if (filteredProducts.length === 0)
        return (
            <p style={{ marginTop: "10rem" }}>
                Nenhum produto encontrado para "{query}"
            </p>
        )

    return (
        <div className="searchPage">
            <h1>Resultados para "{query}"</h1>
            <ProductCard products={filteredProducts} isThree={true} />
        </div>
    )
}
