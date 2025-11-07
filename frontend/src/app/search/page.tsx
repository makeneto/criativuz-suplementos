"use client"

import SearchFilter from "@/components/search/SearchFilter"
import SelectUI from "@/components/search/SelectUI"
import ProductCard from "@/components/ui/ProductCard"
import useProducts from "@/hooks/useProducts"
import { useSearchParams } from "next/navigation"
import { useEffect, useMemo } from "react"

const FILTER_BY = ["Preço, baixo ao alto", "Preço, alto ao baixo"]

export default function SearchPage() {
    const searchParams = useSearchParams()
    const query = (searchParams.get("query") || "").toLowerCase().trim()

    const { data, isPending } = useProducts()
    const allProducts = data?.products || []

    useEffect(() => {
        document.title = query
            ? `Criativuz busca por ${query}`
            : `Criativuz — Buscar produtos`
    }, [query])

    // Separa a query por vírgulas — cada grupo é uma ideia de busca
    const searchGroups = useMemo(() => {
        return query
            .split(",") // divide só por vírgula
            .map((group) => group.trim())
            .filter((group) => group.length > 0)
    }, [query])

    const filteredProducts = allProducts.filter((product: any) => {
        const name = product.name.toLowerCase()
        const category = product.category?.toLowerCase() || ""
        const brand = product.brand?.toLowerCase() || ""

        // O produto entra se atender a pelo menos um grupo de termos
        return searchGroups.some((group) => {
            const terms = group
                .split(/\s+/) // divide o grupo em palavras
                .filter(
                    (t) =>
                        t.length > 1 &&
                        !["de", "da", "do", "e", "para", "com"].includes(t)
                )

            return terms.every(
                (term) =>
                    name.includes(term) ||
                    category.includes(term) ||
                    brand.includes(term)
            )
        })
    })

    const flavourOptions = useMemo(() => {
        const flavours = filteredProducts
            .flatMap((product: any) => product.flavours || [])
            .filter(Boolean)
        return Array.from(new Set(flavours))
    }, [filteredProducts])

    if (isPending) return <p>Carregando...</p>

    if (filteredProducts.length === 0)
        return (
            <p style={{ marginTop: "10rem" }}>
                Nenhum produto encontrado para "{query}"
            </p>
        )

    return (
        <div className="searchPage">
            <main>
                <aside>
                    <SearchFilter filterContent={flavourOptions as string[]} />
                </aside>

                <div>
                    <div className="topFilter">
                        <SelectUI
                            name="Relevância"
                            content={FILTER_BY}
                            isFilterBy={true}
                        />
                        <p className="resultsLength mt-1 text-sm text-zinc-500">
                            {filteredProducts.length} Resultado
                            {filteredProducts.length > 1 ? "s" : ""}
                        </p>
                    </div>

                    <ProductCard products={filteredProducts} isThree={true} />
                </div>
            </main>
        </div>
    )
}
