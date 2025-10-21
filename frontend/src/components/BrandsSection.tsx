import useProducts from "@/hooks/useProducts"
import BrandsItem from "./BrandsItem"

export default async function BrandsSection() {
    const AllBrands = await useProducts()
    const brands = AllBrands.brands

    return (
        <section className="brandsSection">
            <p className="intro__category">Brands</p>
            <h1>Resultado das Melhores Marcas</h1>
            <p className="brandsSection__description">
                Na <span className="lightTag">Criativuz Suplementos</span>, só
                trabalhamos com marcas de confiança, reconhecidas pela qualidade
                e eficácia. Produtos testados e aprovados por atletas e
                especialistas para garantir os melhores resultados.
            </p>

            <BrandsItem brands={brands} />
        </section>
    )
}
