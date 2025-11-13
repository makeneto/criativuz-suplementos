"use client"

import { useDispatch } from "react-redux"
import { v4 as uuidv4 } from "uuid"

import { useProductModal } from "@/hooks/useProductModal"
import { sendWhatsAppMessage } from "@/utils/sendWhatsAppMessage"
import { formatCurrency } from "@/utils/formatCurrency"
import { formatOrderDate } from "@/utils/formatOrderDate"
import { addToCart } from "@/redux/slices/cartSlice"
import { toast } from "sonner"

interface UseProductLogicProps {
    product: any
    buttonLabel?: string
    onSubmit?: (data: {
        product: any
        qtd: number
        weight: string
        flavor: string
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
    const dispatch = useDispatch()
    const {
        qtd,
        imageIndex,
        selectedWeight,
        selectedFlavor,
        handleQtd,
        selectWeight,
        selectFlavor,
        effectivePrice,
        formattedPrice,
        formattedDiscountPrice,
    } = useProductModal(product)

    const formattedTotal = formattedDiscountPrice || formattedPrice

    const handleOrder = () => {
        const today = new Date()

        sendWhatsAppMessage({
            product: product.name,
            brand: product.brand,
            weight: selectedWeight || product.weight?.[0],
            flavor: selectedFlavor || product.flavors?.[0],
            price: formatCurrency(effectivePrice),
            qtd,
            total: formattedTotal,
            deliveryDate: formatOrderDate(deliveryDate || today),
        })
    }

    const handleAddToCart = () => {
        const flavor = selectedFlavor || product.flavors?.[0]
        const weight = selectedWeight || product.weight?.[0]
        const index = product.weight?.indexOf(weight)
        const price = product.price?.[index ?? 0] || product.price?.[0] || 0
        const image =
            product.postImages?.[index ?? 0] || product.postImages?.[0]

        const item = {
            id: uuidv4(),
            name: product.name,
            image,
            price,
            flavor,
            weight,
            category: product.category,
            quantity: qtd,
        }

        dispatch(addToCart(item))

        toast.success(`${product.name} adicionado ao carrinho.`)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        const label = buttonLabel?.toLowerCase()

        if (label === "encomendar") {
            handleOrder()
        } else if (label === "add ao carrinho") {
            handleAddToCart()
        } else {
            onSubmit?.({
                product,
                qtd,
                weight: selectedWeight,
                flavor: selectedFlavor,
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
        selectedFlavor,
        handleQtd,
        handleSelectWeight: selectWeight,
        handleSelectFlavor: selectFlavor,
        handleOrder,
        handleAddToCart,
        handleSubmit,
    }
}
