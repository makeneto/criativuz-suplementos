"use client"

import { useProductModal } from "@/hooks/useProductModal"
import { sendWhatsAppMessage } from "@/utils/sendWhatsAppMessage"
import { formatCurrency } from "@/utils/formatCurrency"
import { formatOrderDate } from "@/utils/formatOrderDate"

interface UseProductLogicProps {
    product: any
    buttonLabel?: string
    onSubmit?: (data: {
        product: any
        qtd: number
        weight: string
        flavour: string
    }) => void
    setProduct?: (value: any) => void
    deliveryDate?: Date
}

export function useProductLogic({
    product,
    buttonLabel,
    onSubmit,
    setProduct,
    deliveryDate,
}: UseProductLogicProps) {
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

        const isOrder =
            buttonLabel?.toLowerCase() === "encomendar" || e.type === "click"

        const today = new Date()

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
                deliveryDate: formatOrderDate(deliveryDate || today),
            })
        } else {
            onSubmit?.({
                product,
                qtd,
                weight: selectedWeight,
                flavour: selectedFlavour,
            })
        }

        setProduct?.(null)
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
