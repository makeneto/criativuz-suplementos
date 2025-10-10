"use client"

import { useState } from "react"
import { formatCurrency } from "@/utils/formatCurrency"

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

    const basePrice = Array.isArray(product.price)
        ? product.price[imageIndex] ?? product.price[0]
        : product.price

    const discountValue = Array.isArray(product.discountPrice)
        ? product.discountPrice[imageIndex] ?? null
        : product.discountPrice ?? null

    const effectivePrice =
        discountValue && discountValue > 0 ? discountValue : basePrice

    const totalBasePrice = basePrice * qtd
    const totalDiscountPrice = effectivePrice * qtd

    const formattedPrice = formatCurrency(totalBasePrice)
    const formattedDiscountPrice =
        discountValue && discountValue > 0
            ? formatCurrency(totalDiscountPrice)
            : null

    return {
        qtd,
        imageIndex,
        selectedWeight,
        selectedFlavour,
        handleQtd,
        selectWeight,
        selectFlavour,
        basePrice,
        effectivePrice,
        formattedPrice,
        formattedDiscountPrice,
    }
}
