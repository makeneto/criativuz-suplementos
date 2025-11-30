"use client"

import React from "react"

import ProductHeader from "@/components/product/ProductHeader"
import ProductDescription from "@/components/product/ProductDescription"
import ProductGallery from "@/components/product/ProductGallery"
import ProductOptions from "@/components/ui/ProductOptions"
import ProductActions from "@/components/product/ProductActions"
import ProductDetails from "@/components/product/ProductDetails"
import useProducts from "@/hooks/product/useProducts"
import ProductPageLoader from "@/components/product/ProductPageLoader"
import { useProductPage } from "@/hooks/product/useProductPage"

interface ProductPageProps {
    params: Promise<{ id: string }>
}

export default function ProductPage({ params }: ProductPageProps) {
    const { id } = React.use(params)
    const { data, isPending } = useProducts()
    const products = data?.products ?? []
    const product = products.find((p: any) => p.id === Number(id))

    const {
        deliveryDate,
        setDeliveryDate,
        imageIndex,
        qtd,
        formattedPrice,
        formattedDiscountPrice,
        selectedWeight,
        selectedFlavor,
        handleQtd,
        handleSelectWeight,
        handleSelectFlavor,
        handleSubmit,
        handleOrderClick,
        handleAddToCart,
    } = useProductPage(product)

    if (isPending) return <ProductPageLoader />

    if (!product)
        return <div className="productPage">Produto não encontrado.</div>

    return (
        <section className="productPage">
            <div className="productPage__container">
                <ProductGallery
                    isProductPage
                    imageIndex={imageIndex}
                    alt={product.name}
                    product={product}
                />

                <form
                    className="productPage__container--content"
                    onSubmit={handleSubmit}
                >
                    <ProductHeader
                        product={product}
                        price={formattedPrice}
                        discountPrice={formattedDiscountPrice ?? undefined}
                    />
                    <ProductDescription text={product.description?.synopsis} />

                    <ProductOptions
                        isProductPage
                        weights={product.weight}
                        flavors={product.flavors}
                        selectedWeight={selectedWeight}
                        selectedFlavor={selectedFlavor}
                        onSelectWeight={handleSelectWeight}
                        onSelectFlavor={handleSelectFlavor}
                    />

                    <ProductActions
                        qtd={qtd}
                        onAdd={() => handleQtd("add")}
                        onSubtract={() => handleQtd("subtract")}
                        deliveryDate={deliveryDate}
                        setDeliveryDate={setDeliveryDate}
                        onOrder={handleOrderClick}
                        onAddToCart={handleAddToCart}
                    />

                    <ProductDetails
                        highlights={product.description.highlights}
                        info={product.description.information}
                        useCase={product.description.useCase}
                        usage={product.description.recommendedUse}
                    />
                </form>
            </div>
        </section>
    )
}
