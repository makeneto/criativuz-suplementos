import useProducts from "@/hooks/useProducts"
import BrandsItem from "./BrandsItem"

export default async function BrandsSection() {
    const AllBrands = await useProducts()
    const brands = AllBrands.brands

    return (
        <section className="brandsSection">
            <h1>
                Força que vem das{" "}
                <span className="lightTag">Melhores Marcas</span>
            </h1>
            <p>
                Na <span className="lightTag">Criativuz Suplementos</span>, só
                trabalhamos com marcas de confiança, reconhecidas pela qualidade
                e eficácia. Produtos testados e aprovados por atletas e
                especialistas para garantir os melhores resultados.
            </p>

            <BrandsItem brands={brands} />
        </section>
    )
}
