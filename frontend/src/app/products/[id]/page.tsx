"use client"

import React, { useState, useEffect } from "react"
import ProductImage from "@/components/ProductImage"
import ProductOptions from "@/components/ui/ProductOptions"
import { useProductLogic } from "@/hooks/useProductLogic"
import useProducts from "@/hooks/useProducts"
import ProductHeader from "@/components/ProductHeader"
import ProductDescription from "@/components/ProductDescription"
import ProductActions from "@/components/ProductActions"
import ProductDetails from "@/components/ProductDetails"
import Spinner from "@/components/ui/Spinner"
import Image from "next/image"
import ProductGallery from "@/components/ProductGallery"

interface ProductPageProps {
    params: Promise<{ id: string }>
}

export default function ProductPage({ params }: ProductPageProps) {
    const { id } = React.use(params)
    const { data, isPending } = useProducts()
    const products = data?.products ?? []
    const product = products.find((p: any) => p.id === Number(id))

    const [deliveryDate, setDeliveryDate] = useState<Date | undefined>()

    useEffect(() => {
        if (product) document.title = `Criativuz | ${product.name}`
    }, [product])

    if (isPending)
        return (
            <div
                className="productPage"
                style={{
                    height: "100dvh",
                    display: "flex",
                    alignItems: "start",
                }}
            >
                <Spinner size="64" />
            </div>
        )

    if (!product)
        return <div className="productPage">Produto não encontrado.</div>

    const {
        imageIndex,
        qtd,
        formattedPrice,
        formattedDiscountPrice,
        selectedWeight,
        selectedFlavour,
        handleQtd,
        handleSelectWeight,
        handleSelectFlavour,
        handleSubmit,
    } = useProductLogic({
        product,
        buttonLabel: "Encomendar",
        deliveryDate,
    })

    const handleOrderClick = (e: React.MouseEvent) => {
        e.preventDefault()
        handleSubmit({ preventDefault() {}, type: "submit" } as React.FormEvent)
    }

    return (
        <section className="productPage">
            <div className="productPage__container">
                <ProductGallery
                    isProductPage
                    src={product.postImages[imageIndex]}
                    alt={product.name}
                    product={product}
                />

                <form
                    className="productPage__container--content"
                    onSubmit={handleSubmit}
                >
                    <ProductHeader
                        name={product.name}
                        price={formattedPrice}
                        discountPrice={formattedDiscountPrice ?? undefined}
                    />

                    <ProductDescription text={product.description?.synopsis} />

                    <ProductOptions
                        isProductPage
                        weights={product.weight}
                        flavours={product.flavours}
                        selectedWeight={selectedWeight}
                        selectedFlavour={selectedFlavour}
                        onSelectWeight={handleSelectWeight}
                        onSelectFlavour={handleSelectFlavour}
                    />

                    <ProductActions
                        qtd={qtd}
                        onAdd={() => handleQtd("add")}
                        onSubtract={() => handleQtd("subtract")}
                        deliveryDate={deliveryDate}
                        setDeliveryDate={setDeliveryDate}
                        onOrder={handleOrderClick}
                    />

                    <ProductDetails
                        highlights={product.description.highlights}
                        info={product.description.information}
                        usage={product.description.recommendedUse}
                    />
                </form>
            </div>
        </section>
    )
}
