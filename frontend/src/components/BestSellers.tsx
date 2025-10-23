"use client"

import useProducts from "@/hooks/useProducts"
import ProductCard from "./ui/ProductCard"
import IntroSection from "./IntroSection"
import Spinner from "./ui/Spinner"

export default function BestSellers() {
    const { data, isPending } = useProducts()

    const allProducts = data?.products || []
    const bestSellers = allProducts.filter((p: any) => p.bestSeller)

    return (
        <section className="sectionGrid">
            <IntroSection category="Bestsellers" title="Mais Vendidos" />
            {isPending ? (
                <Spinner  />
            ) : (
                <ProductCard products={bestSellers} />
            )}
        </section>
    )
}
