"use client"

import SearchFilter from "@/components/search/SearchFilter"
import SelectUI from "@/components/search/SelectUI"
import ProductCard from "@/components/product/ProductCard"
import useProducts from "@/hooks/useProducts"
import { useSearchParams } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import ShowNoProducts from "@/components/search/ShowNoProducts"
import { GOALS } from "@/components/search/UserGoals"

const FILTER_BY = ["Preço, baixo ao alto", "Preço, alto ao baixo"]

export default function SearchPage() {
    const searchParams = useSearchParams()
    const query = (searchParams.get("query") || "").toLowerCase().trim()

    const { data, isPending } = useProducts()
    const allProducts = data?.products || []

    // Estados de filtros
    const [selectedFlavor, setSelectedFlavor] = useState<string | null>(null)
    const [sortBy, setSortBy] = useState<string | null>(null)
    const [currentPrice, setCurrentPrice] = useState(0)
    const [selectedMaxPrice, setSelectedMaxPrice] = useState(0)
    const [selectedGoals, setSelectedGoals] = useState<string[]>([])
    const [selectedBrands, setSelectedBrands] = useState<string[]>([])
    const [selectedCategory, setSelectedCategory] = useState<string | null>(
        null
    )

    // Título da página
    useEffect(() => {
        document.title = query
            ? `Criativuz busca por ${query}`
            : `Criativuz — Buscar produtos`
    }, [query])

    // Produtos filtrados pela busca textual
    const filteredByQuery = useMemo(() => {
        if (!query) return allProducts
        const searchGroups = query
            .split(",")
            .map((g) => g.trim())
            .filter((g) => g.length > 0)

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
    }, [allProducts, query])

    // Opções de sabores e marcas disponíveis (antes do filtro de preço)
    const flavorOptions = useMemo(() => {
        const flavors = filteredByQuery
            .flatMap((p: any) => p.flavors || [])
            .filter(Boolean) as string[]
        return ["Todos", ...Array.from(new Set(flavors))]
    }, [filteredByQuery])

    const allBrands = useMemo(() => {
        const brands = filteredByQuery
            .map((p: any) => p.brand)
            .filter((b: any): b is string => !!b)
        return Array.from(new Set(brands)).sort()
    }, [filteredByQuery])

    // 1️⃣ Filtragem inicial: Objetivo → Marca → Categoria → Sabor
    const prePriceFilteredProducts = useMemo(() => {
        return (
            filteredByQuery
                // Objetivo → filtra por categorias mapeadas dos objetivos selecionados
                .filter((p: any) => {
                    if (!selectedGoals.length) return true
                    const categoriesFromGoals = selectedGoals.flatMap(
                        (goal) => GOALS[goal] || []
                    )
                    return categoriesFromGoals.some(
                        (cat) => p.category?.toLowerCase() === cat.toLowerCase()
                    )
                })
                // Marca → filtra pelos brands selecionados
                .filter(
                    (p: any) =>
                        !selectedBrands.length ||
                        selectedBrands.includes(p.brand)
                )
                // Categoria → filtra pela categoria selecionada (dropdown)
                .filter((p: any) =>
                    !selectedCategory || selectedCategory === "Todas"
                        ? true
                        : p.category === selectedCategory
                )
                // Sabor → filtra pelo flavor selecionado
                .filter((p: any) =>
                    !selectedFlavor || selectedFlavor === "Todos"
                        ? true
                        : p.flavors?.includes(selectedFlavor)
                )
        )
    }, [
        filteredByQuery,
        selectedGoals,
        selectedBrands,
        selectedCategory,
        selectedFlavor,
    ])

    // 2️⃣ CategoryOptions dinâmico baseado no conjunto pré-preço
    const categoryOptions = useMemo(() => {
        const categories = prePriceFilteredProducts
            .map((p: any) => p.category)
            .filter((c: any): c is string => !!c)
        return ["Todas", ...Array.from(new Set(categories))]
    }, [prePriceFilteredProducts])

    // 3️⃣ Preço máximo adaptável
    const maxPrice = useMemo(() => {
        const prices = prePriceFilteredProducts
            .flatMap((p: any) => (Array.isArray(p.price) ? p.price : [p.price]))
            .filter(Number.isFinite)
        return prices.length ? Math.max(...prices) : 0
    }, [prePriceFilteredProducts])

    useEffect(() => {
        setCurrentPrice(maxPrice)
        setSelectedMaxPrice(maxPrice)
    }, [maxPrice])

    // 4️⃣ Filtragem final considerando preço
    const finalProducts = useMemo(() => {
        return prePriceFilteredProducts.filter((p: any) => {
            const prices = Array.isArray(p.price) ? p.price : [p.price]
            return prices.some((price: any) => price <= selectedMaxPrice)
        })
    }, [prePriceFilteredProducts, selectedMaxPrice])

    // Ordenação final
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

    if (isPending) return <p>Carregando...</p>

    return (
        <div className="searchPage">
            <div className="topFilter">
                <SelectUI
                    name="Relevância"
                    content={FILTER_BY}
                    isFilterBy
                    onSelect={setSortBy}
                />
                <p className="resultsLength mt-1 text-sm text-zinc-500">
                    {sortedProducts.length} Resultado
                    {sortedProducts.length > 1 && "s"}
                </p>
            </div>

            <main className="flex gap-6">
                <aside>
                    <SearchFilter
                        filterContent={flavorOptions}
                        selected={selectedFlavor}
                        onSelect={setSelectedFlavor}
                        minPrice={0}
                        maxPrice={maxPrice}
                        value={currentPrice}
                        onChange={setCurrentPrice}
                        onChangeEnd={setSelectedMaxPrice}
                        selectedGoals={selectedGoals}
                        onChangeGoals={setSelectedGoals}
                        availableBrands={allBrands}
                        selectedBrands={selectedBrands}
                        onChangeBrands={setSelectedBrands}
                        selectedCategory={selectedCategory}
                        onChangeCategory={setSelectedCategory}
                        categoryOptions={categoryOptions}
                    />
                </aside>

                {sortedProducts.length === 0 ? (
                    <ShowNoProducts notFoundPrice={selectedMaxPrice} />
                ) : (
                    <ProductCard products={sortedProducts} isThree />
                )}
            </main>
        </div>
    )
}
