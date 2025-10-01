import { formatCurrency } from "@/utils/formatCurrency"
import { X } from "lucide-react"
import React, { useState } from "react"

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
    const [qtd, setQtd] = useState<number>(1)
    const [imageIndex, setImageIndex] = useState(0)
    const [selectedWeight, setSelectedWeight] = useState(product.weight[0])
    const [selectedFlavour, setSelectedFlavour] = useState(product.flavours[0])

    function handleQtd(operation: string) {
        setQtd((prev) => {
            if (operation === "add") return prev + 1
            if (operation === "subtract" && prev > 1) return prev - 1
            return prev
        })
    }

    const unitPrice = Array.isArray(product.price)
        ? product.price[imageIndex] ?? product.price[0]
        : product.price

    const totalPrice = unitPrice * qtd

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
                    <img
                        src={product.postImages[imageIndex]}
                        alt={product.name}
                        className="modalProduct__container--image"
                    />

                    <div className="modalProduct__container--content">
                        <div>
                            <h2>{product.name}</h2>
                            <p>{formatCurrency(totalPrice)}</p>
                        </div>

                        <p className="modalProduct__container--content--description">
                            {product.description?.synopsis}
                        </p>

                        <section>
                            <ul className="modalProduct__container--content--list">
                                <li>Peso</li>
                                {product.weight.map((w: any, index: number) => (
                                    <li
                                        key={index}
                                        onClick={() => {
                                            setSelectedWeight(w)
                                            setImageIndex(index)
                                        }}
                                        className={
                                            selectedWeight === w ? "active" : ""
                                        }
                                    >
                                        {w}
                                    </li>
                                ))}
                            </ul>

                            <ul className="modalProduct__container--content--list">
                                <li>Sabor</li>
                                {product.flavours.map(
                                    (f: any, index: number) => (
                                        <li
                                            key={index}
                                            onClick={() =>
                                                setSelectedFlavour(f)
                                            }
                                            className={
                                                selectedFlavour === f
                                                    ? "active"
                                                    : ""
                                            }
                                        >
                                            {f}
                                        </li>
                                    )
                                )}
                            </ul>
                        </section>

                        <div className="submitSection">
                            <span>
                                <button
                                    type="button"
                                    disabled={qtd === 1}
                                    onClick={() => handleQtd("subtract")}
                                >
                                    -
                                </button>
                                <p>{qtd}</p>
                                <button
                                    type="button"
                                    onClick={() => handleQtd("add")}
                                >
                                    +
                                </button>
                            </span>

                            <button type="submit">{buttonLabel}</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}
