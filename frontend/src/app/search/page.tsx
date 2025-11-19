"use client"

import SearchFilter from "@/components/search/SearchFilter"
import SelectUI from "@/components/search/SelectUI"
import ProductCard from "@/components/product/ProductCard"
import useProducts from "@/hooks/useProducts"
import { useSearchParams } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import ShowNoProducts from "@/components/search/ShowNoProducts"

const FILTER_BY = ["Preço, baixo ao alto", "Preço, alto ao baixo"]

export default function SearchPage() {
    const searchParams = useSearchParams()
    const query = (searchParams.get("query") || "").toLowerCase().trim()

    const { data, isPending } = useProducts()
    const allProducts = data?.products || []

    const [selectedFlavor, setSelectedFlavor] = useState<string | null>(null)
    const [sortBy, setSortBy] = useState<string | null>(null)

    // Slider
    const [currentPrice, setCurrentPrice] = useState(0) // Slider em movimento
    const [selectedMaxPrice, setSelectedMaxPrice] = useState(0) // Valor final aplicado

    useEffect(() => {
        document.title = query
            ? `Criativuz busca por ${query}`
            : `Criativuz — Buscar produtos`
    }, [query])

    const searchGroups = useMemo(() => {
        return query
            .split(",")
            .map((group) => group.trim())
            .filter((group) => group.length > 0)
    }, [query])

    const filteredByQuery = useMemo(() => {
        return allProducts.filter((product: any) => {
            const name = product.name.toLowerCase()
            const category = product.category?.toLowerCase() || ""
            const brand = product.brand?.toLowerCase() || ""

            return searchGroups.some((group) => {
                const terms = group
                    .split(/\s+/)
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
    }, [allProducts, searchGroups])

    // Todos os preços como array para min e max
    const allPrices = useMemo(() => {
        return filteredByQuery
            .flatMap((p: any) => (Array.isArray(p.price) ? p.price : [p.price]))
            .filter(Number.isFinite)
    }, [filteredByQuery])

    const minPrice = 0 // sempre 0 como você pediu
    const maxPrice = useMemo(() => {
        return allPrices.length ? Math.max(...allPrices) : 0
    }, [allPrices])

    // Inicializa slider
    useEffect(() => {
        setCurrentPrice(maxPrice)
        setSelectedMaxPrice(maxPrice)
    }, [maxPrice])

    // Filtra produtos pelo maxPrice selecionado
    const filteredByPrice = useMemo(() => {
        return filteredByQuery.filter((p: any) => {
            const prices = Array.isArray(p.price) ? p.price : [p.price]
            return prices.some((price: number) => price <= selectedMaxPrice)
        })
    }, [filteredByQuery, selectedMaxPrice])

    // Filtra por sabor
    const filteredByFlavor = useMemo(() => {
        if (!selectedFlavor || selectedFlavor === "Todos")
            return filteredByPrice
        return filteredByPrice.filter((p: any) =>
            p.flavors?.includes(selectedFlavor)
        )
    }, [filteredByPrice, selectedFlavor])

    // Ordena
    const finalProducts = useMemo(() => {
        const sorted = [...filteredByFlavor]
        if (sortBy === "Preço, baixo ao alto")
            sorted.sort((a, b) => {
                const aPrice = Array.isArray(a.price)
                    ? Math.min(...a.price)
                    : a.price
                const bPrice = Array.isArray(b.price)
                    ? Math.min(...b.price)
                    : b.price
                return aPrice - bPrice
            })
        if (sortBy === "Preço, alto ao baixo")
            sorted.sort((a, b) => {
                const aPrice = Array.isArray(a.price)
                    ? Math.min(...a.price)
                    : a.price
                const bPrice = Array.isArray(b.price)
                    ? Math.min(...b.price)
                    : b.price
                return bPrice - aPrice
            })
        return sorted
    }, [filteredByFlavor, sortBy])

    // Sabores
    const flavorOptions = useMemo<string[]>(() => {
        const flavors: string[] = filteredByQuery
            .flatMap((p: any) => p.flavors || [])
            .filter(Boolean)
        return ["Todos", ...Array.from(new Set(flavors))]
    }, [filteredByQuery])

    if (isPending) return <p>Carregando...</p>

    const showNoProducts = filteredByPrice.length === 0

    return (
        <div className="searchPage">
            <div className="topFilter">
                <SelectUI
                    name="Relevância"
                    content={FILTER_BY}
                    isFilterBy={true}
                    onSelect={setSortBy}
                />
                <p className="resultsLength mt-1 text-sm text-zinc-500">
                    {finalProducts.length} Resultado
                    {finalProducts.length > 1 ? "s" : ""}
                </p>
            </div>

            <main>
                <aside>
                    <SearchFilter
                        filterContent={flavorOptions}
                        selected={selectedFlavor}
                        onSelect={setSelectedFlavor}
                        minPrice={minPrice}
                        maxPrice={maxPrice}
                        value={currentPrice}
                        onChange={setCurrentPrice}
                        onChangeEnd={setSelectedMaxPrice}
                    />
                </aside>

                {showNoProducts ? (
                    <ShowNoProducts notFoundPrice={selectedMaxPrice} />
                ) : (
                    <ProductCard
                        products={
                            finalProducts.length
                                ? finalProducts
                                : filteredByQuery
                        }
                        isThree={true}
                    />
                )}
            </main>
        </div>
    )
}
