"use client"

import useProducts from "@/hooks/product/useProducts"
import BrandsItem from "../brands/BrandsItem"
import Spinner from "../ui/Spinner"

export default function BrandsSection() {
    const { data, isPending } = useProducts()
    const brands = data?.brands || []

    return (
        <section className="brandsSection" id="brands">
            <div className="introSection">
                <p className="intro__category">Brands</p>
                <h1 className="font-medium ">Resultado das Melhores Marcas</h1>
                <p className="brandsSection__description">
                    Na <span className="lightTag">Criativuz Suplementos</span>,
                    trabalhamos apenas com marcas confiáveis, testadas e
                    aprovadas por atletas e especialistas para garantir
                    qualidade e resultados.
                </p>
            </div>

            {isPending ? <Spinner /> : <BrandsItem brands={brands} />}
        </section>
    )
}
