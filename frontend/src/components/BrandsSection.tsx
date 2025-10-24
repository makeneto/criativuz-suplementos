"use client"

import useProducts from "@/hooks/useProducts"
import BrandsItem from "./BrandsItem"
import Spinner from "./ui/Spinner"

export default function BrandsSection() {
    const { data, isPending } = useProducts()
    const brands = data?.brands || []

    return (
        <section className="brandsSection">
            <p className="intro__category">Brands</p>
            <h1 className="font-medium ">Resultado das Melhores Marcas</h1>
            <p className="brandsSection__description">
                Na <span className="lightTag">Criativuz Suplementos</span>, só
                trabalhamos com marcas de confiança, reconhecidas pela qualidade
                e eficácia. Produtos testados e aprovados por atletas e
                especialistas para garantir os melhores resultados.
            </p>

            {isPending ? <Spinner /> : <BrandsItem brands={brands} />}
        </section>
    )
}
