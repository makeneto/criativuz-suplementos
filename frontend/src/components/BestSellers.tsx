import useProducts from "@/hooks/useProducts"
import ProductCard from "./ui/ProductCard"

export default async function BestSellers() {
    const supplements = await useProducts()
    const allProducts = supplements.products
    const bestSellers = allProducts.filter((p: any) => p.bestSeller)

    return (
        <section className="sectionGrid">
            <h1 className="sectionGrid__title">Mais Vendidos</h1>
            <ProductCard products={bestSellers} />
        </section>
    )
}
