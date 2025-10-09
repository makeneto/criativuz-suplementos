"use client"

import { formatCurrency } from "@/utils/formatCurrency"
import { X } from "lucide-react"
import ProductImage from "./ProductImage"
import ProductOptions from "./ui/ProductOptions"
import ProductQuantity from "./ui/ProductQuantity"
import { useProductModal } from "@/hooks/useProductModal"

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
        qtd,
        imageIndex,
        selectedWeight,
        selectedFlavour,
        handleQtd,
        selectWeight,
        selectFlavour,
        totalPrice,
    } = useProductModal(product)

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        onSubmit({
            product,
            qtd,
            weight: selectedWeight,
            flavour: selectedFlavour,
        })
    }

    return (
        <div className="modalOverlay">
            <form className="modalProduct" onSubmit={handleSubmit}>
                <div
                    onClick={() => setProduct(null)}
                    className="modalProduct__container--closeButton"
                >
                    <X size={20} />
                </div>

                <div className="modalProduct__container">
                    <ProductImage
                        src={product.postImages[imageIndex]}
                        alt={product.name}
                    />

                    <div className="modalProduct__container--content">
                        <header>
                            <h2>{product.name}</h2>
                            <p>{formatCurrency(totalPrice)}</p>
                        </header>

                        <p className="modalProduct__container--content--description">
                            {product.description?.synopsis}
                        </p>

                        <ProductOptions
                            weights={product.weight}
                            flavours={product.flavours}
                            selectedWeight={selectedWeight}
                            selectedFlavour={selectedFlavour}
                            onSelectWeight={selectWeight}
                            onSelectFlavour={selectFlavour}
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
