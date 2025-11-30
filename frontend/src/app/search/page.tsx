"use client"

import { useSearchParams } from "next/navigation"
import SelectUI from "@/components/search/SelectUI"
import SearchFilter from "@/components/search/SearchFilter"
import ProductCard from "@/components/product/ProductCard"
import ShowNoProducts from "@/components/search/ShowNoProducts"
import useProducts from "@/hooks/product/useProducts"
import { useSearchFilters } from "@/hooks/search/useSearchFilters"
import { useMediaQuery } from "react-responsive"
import MobileFilterSheet from "@/components/search/MobileFilterSheet"

const FILTER_BY = ["Preço, baixo ao alto", "Preço, alto ao baixo"]

export default function SearchPage() {
    const searchParams = useSearchParams()
    const query = (searchParams.get("query") || "").toLowerCase().trim()
    const { data, isPending } = useProducts()
    const allProducts = data?.products || []

    const isDesktop = useMediaQuery({ minWidth: 769 })

    const {
        selectedFlavor,
        setSelectedFlavor,
        setSortBy,
        currentPrice,
        setCurrentPrice,
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
    } = useSearchFilters(allProducts, query)

    if (isPending) return <p>Carregando...</p>

    return (
        <div className="searchPage">
            <div className="topFilter">
                {isDesktop ? (
                    <SelectUI
                        name="Relevância"
                        content={FILTER_BY}
                        isFilterBy
                        onSelect={setSortBy}
                    />
                ) : (
                    <MobileFilterSheet
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
                    >
                        <SelectUI
                            name="Relevância"
                            content={FILTER_BY}
                            isFilterBy
                            onSelect={setSortBy}
                        />
                    </MobileFilterSheet>
                )}
                <p className="resultsLength mt-1 text-sm text-zinc-500">
                    {sortedProducts.length} Resultado
                    {sortedProducts.length > 1 && "s"}
                </p>
            </div>

            <main>
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
                    <ShowNoProducts />
                ) : (
                    <ProductCard products={sortedProducts} isThree />
                )}
            </main>
        </div>
    )
}
