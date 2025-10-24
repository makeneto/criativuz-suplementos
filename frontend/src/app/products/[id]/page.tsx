"use client"

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

import ProductImage from "@/components/ProductImage"
import ProductOptions from "@/components/ui/ProductOptions"
import ProductQuantity from "@/components/ui/ProductQuantity"
import { useProductLogic } from "@/hooks/useProductLogic"
import useProducts from "@/hooks/useProducts"
import { Atom } from "lucide-react"
import { Calendar22 } from "@/components/Calendar22"
import { useEffect, useState } from "react"

interface ProductPageProps {
    params: {
        id: string
    }
}

export default function ProductPage({ params }: ProductPageProps) {
    const { data, isPending } = useProducts()
    const allProducts = data?.products || []
    const product = allProducts.find((p: any) => p.id === Number(params.id))

    const [deliveryDate, setDeliveryDate] = useState<Date | undefined>()

    if (isPending) {
        return (
            <div className="productPage">
                <p>Carregando produto...</p>
            </div>
        )
    }

    if (!product) {
        return <div className="productPage">Produto não encontrado.</div>
    }

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

    const handleOrder = (e: React.MouseEvent) => {
        e.preventDefault()
        handleSubmit({
            preventDefault: () => {},
            type: "submit",
        } as unknown as React.FormEvent)
    }

    useEffect(() => {
        document.title = `Criativuz | ${product.name}`
    }, [product?.name])

    return (
        <section className="productPage">
            <div className="productPage__container">
                <ProductImage
                    isProductPage={true}
                    src={product.postImages[imageIndex]}
                    alt={product.name}
                />

                <form
                    className="productPage__container--content"
                    onSubmit={handleSubmit}
                >
                    <header>
                        <h2>{product.name}</h2>
                        {formattedDiscountPrice ? (
                            <div>
                                <p>{formattedDiscountPrice}</p>
                                <span>{formattedPrice}</span>
                            </div>
                        ) : (
                            <p>{formattedPrice}</p>
                        )}
                    </header>

                    <p className="productPage__container--content--description">
                        {product.description?.synopsis}
                    </p>

                    <ProductOptions
                        isProductPage={true}
                        weights={product.weight}
                        flavours={product.flavours}
                        selectedWeight={selectedWeight}
                        selectedFlavour={selectedFlavour}
                        onSelectWeight={handleSelectWeight}
                        onSelectFlavour={handleSelectFlavour}
                    />

                    <div className="productSubmitSection">
                        <div style={{ marginBottom: "1rem" }}>
                            <ProductQuantity
                                qtd={qtd}
                                onAdd={() => handleQtd("add")}
                                onSubtract={() => handleQtd("subtract")}
                            />
                            <Calendar22
                                date={deliveryDate}
                                setDate={setDeliveryDate}
                            />
                        </div>

                        <div>
                            <button type="button" className="order">
                                Add ao Carrinho
                            </button>

                            <button
                                type="submit"
                                className="cart"
                                onClick={handleOrder}
                            >
                                Encomendar
                            </button>
                        </div>
                    </div>

                    <div className="productPage__details">
                        <ul className="productPage__details--highlights">
                            {product.description.highlights.map(
                                (item: string, index: number) => (
                                    <li key={index}>
                                        <Atom />
                                        {item}
                                    </li>
                                )
                            )}
                        </ul>

                        <Accordion
                            type="single"
                            defaultValue="item-1"
                            collapsible
                        >
                            <AccordionItem value="item-1">
                                <AccordionTrigger>Informações</AccordionTrigger>
                                <AccordionContent>
                                    {product.description.information}
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-2">
                                <AccordionTrigger>Como usar?</AccordionTrigger>
                                <AccordionContent>
                                    {product.description.recommendedUse}
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </form>
            </div>
        </section>
    )
}
