"use client"

import { X } from "lucide-react"
import ProductImage from "./ProductImage"
import ProductOptions from "./ui/ProductOptions"
import ProductQuantity from "./ui/ProductQuantity"
import { useProductModalLogic } from "@/hooks/useProductModalLogic"

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
    } = useProductModalLogic({ product, buttonLabel, onSubmit, setProduct })

    return (
        <div className="modalOverlay">
            <form className="modalProduct" onSubmit={handleSubmit}>
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

                    <div className="modalProduct__container--content">
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
                    </div>
                </div>
            </form>
        </div>
    )
}
