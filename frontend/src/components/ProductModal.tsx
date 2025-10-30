"use client"

import * as React from "react"
import { X } from "lucide-react"
import ProductImage from "./ProductImage"
import ProductOptions from "./ui/ProductOptions"
import ProductQuantity from "./ui/ProductQuantity"
import { useProductLogic } from "@/hooks/useProductLogic"
import { Calendar22 } from "./Calendar22"

interface ProductModalProps {
    product: {
        name: string
        brand: string
        description?: { synopsis?: string }
        postImages: string[]
        weight: string[]
        flavours: string[]
    }
    setProduct: (value: any) => void
    buttonLabel: string
    onSubmit: (data: {
        product: any
        qtd: number
        weight: string
        flavour: string
    }) => void
}

export default function ProductModal({
    product,
    setProduct,
    buttonLabel,
    onSubmit,
}: ProductModalProps) {
    const [deliveryDate, setDeliveryDate] = React.useState<Date | undefined>()

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
        handleAddToCart, // 👈 here
        handleOrder, // 👈 and here
    } = useProductLogic({
        product,
        onSubmit,
        setProduct,
        deliveryDate,
    })

    return (
        <div className="modalOverlay">
            <div className="modalProduct">
                <button
                    type="button"
                    onClick={() => setProduct(null)}
                    className="modalProduct__container--closeButton"
                >
                    <X size={20} />
                </button>

                <div className="modalProduct__container">
                    <ProductImage
                        src={product.postImages[imageIndex]}
                        alt={product.name}
                    />

                    <form className="modalProduct__container--content">
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

                        {product.description?.synopsis && (
                            <p className="modalProduct__container--content--description">
                                {product.description.synopsis}
                            </p>
                        )}

                        <ProductOptions
                            weights={product.weight}
                            flavours={product.flavours}
                            selectedWeight={selectedWeight}
                            selectedFlavour={selectedFlavour}
                            onSelectWeight={handleSelectWeight}
                            onSelectFlavour={handleSelectFlavour}
                        />

                        <div className="calendarSection">
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

                        <div className="submitSection">
                            <button type="button" onClick={handleAddToCart}>
                                Add ao carrinho
                            </button>

                            <button type="button" onClick={handleOrder}>
                                Encomendar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
