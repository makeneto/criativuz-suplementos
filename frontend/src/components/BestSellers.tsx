"use client"

import useProducts from "@/hooks/useProducts"
import ProductCard from "./ui/ProductCard"
import IntroSection from "./IntroSection"

export default function BestSellers() {
    const { data, isPending } = useProducts()

    if (isPending) {
        return (
            <section className="sectionGrid">
                <IntroSection category="Bestsellers" title="Mais Vendidos" />
                <p>Carregando produtos...</p>
            </section>
        )
    }

    const allProducts = data?.products || []
    const bestSellers = allProducts.filter((p: any) => p.bestSeller)

    return (
        <section className="sectionGrid">
            <IntroSection category="Bestsellers" title="Mais Vendidos" />
            <ProductCard products={bestSellers} />
        </section>
    )
}
