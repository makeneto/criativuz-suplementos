"use client"

import { useProductModal } from "@/hooks/useProductModal"
import { sendWhatsAppMessage } from "@/utils/sendWhatsAppMessage"
import { formatCurrency } from "@/utils/formatCurrency"

interface UseProductModalLogicProps {
    product: any
    buttonLabel: string
    onSubmit: (data: {
        product: any
        qtd: number
        weight: string
        flavour: string
    }) => void
    setProduct: (value: any) => void
}

export function useProductModalLogic({
    product,
    buttonLabel,
    onSubmit,
}: UseProductModalLogicProps) {
    const {
        qtd,
        imageIndex,
        selectedWeight,
        selectedFlavour,
        handleQtd,
        selectWeight,
        selectFlavour,
        effectivePrice,
        formattedPrice,
        formattedDiscountPrice,
    } = useProductModal(product)

    const formattedTotal = formattedDiscountPrice || formattedPrice
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        const isOrder = buttonLabel.toLowerCase() === "encomendar"

        if (isOrder) {
            sendWhatsAppMessage({
                phone: "244945336003",
                product: product.name,
                brand: product.brand,
                weight: selectedWeight || product.weight?.[0],
                flavour: selectedFlavour || product.flavours?.[0],
                price: formatCurrency(effectivePrice),
                qtd,
                total: formattedTotal,
            })
        } else {
            onSubmit({
                product,
                qtd,
                weight: selectedWeight,
                flavour: selectedFlavour,
            })
        }
    }

    return {
        qtd,
        imageIndex,
        formattedPrice,
        formattedDiscountPrice,
        formattedTotal,
        selectedWeight,
        selectedFlavour,
        handleQtd,
        handleSelectWeight: selectWeight,
        handleSelectFlavour: selectFlavour,
        handleSubmit,
    }
}
