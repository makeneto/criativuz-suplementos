"use client"

import { useState } from "react"

export function useProductModal(product: any) {
    const [qtd, setQtd] = useState<number>(1)
    const [imageIndex, setImageIndex] = useState(0)
    const [selectedWeight, setSelectedWeight] = useState(product.weight?.[0])
    const [selectedFlavour, setSelectedFlavour] = useState(
        product.flavours?.[0] || ""
    )

    const handleQtd = (type: "add" | "subtract") =>
        setQtd((prev) => {
            if (type === "add") return prev + 1
            if (type === "subtract" && prev > 1) return prev - 1
            return prev
        })

    const selectWeight = (weight: string, index: number) => {
        setSelectedWeight(weight)
        setImageIndex(index)
    }

    const selectFlavour = (flavour: string) => setSelectedFlavour(flavour)

    const unitPrice = Array.isArray(product.price)
        ? product.price[imageIndex] ?? product.price[0]
        : product.price

    const totalPrice = unitPrice * qtd

    return {
        qtd,
        imageIndex,
        selectedWeight,
        selectedFlavour,
        handleQtd,
        selectWeight,
        selectFlavour,
        unitPrice,
        totalPrice,
    }
}
