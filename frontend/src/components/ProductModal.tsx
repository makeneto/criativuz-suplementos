"use client"

import { X } from "lucide-react"
import ProductImage from "./ProductImage"
import ProductOptions from "./ui/ProductOptions"
import ProductQuantity from "./ui/ProductQuantity"
import { useProductLogic } from "@/hooks/useProductLogic"

interface ProductModalProps {
    product: any
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
    } = useProductLogic({ product, buttonLabel, onSubmit, setProduct })

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

                    <form
                        className="modalProduct__container--content"
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

                        <p className="modalProduct__container--content--description">
                            {product.description?.synopsis}
                        </p>

                        <ProductOptions
                            weights={product.weight}
                            flavours={product.flavours}
                            selectedWeight={selectedWeight}
                            selectedFlavour={selectedFlavour}
                            onSelectWeight={handleSelectWeight}
                            onSelectFlavour={handleSelectFlavour}
                        />

                        <div className="submitSection">
                            <ProductQuantity
                                qtd={qtd}
                                onAdd={() => handleQtd("add")}
                                onSubtract={() => handleQtd("subtract")}
                            />
                            <button type="submit">{buttonLabel}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
