import { useState, useEffect } from "react"
import { useAppDispatch } from "@/redux/hooks"
import { addToCart } from "@/redux/slices/cartSlice"
import { toast } from "sonner"
import { v4 as uuidv4 } from "uuid"
import { useProductLogic } from "./useProductLogic"

export function useProductPage(product: any) {
    const dispatch = useAppDispatch()
    const [deliveryDate, setDeliveryDate] = useState<Date | undefined>()

    useEffect(() => {
        if (product) document.title = `Criativuz | ${product.name}`
    }, [product])

    const {
        imageIndex,
        qtd,
        formattedPrice,
        formattedDiscountPrice,
        selectedWeight,
        selectedFlavor,
        handleQtd,
        handleSelectWeight,
        handleSelectFlavor,
        handleSubmit,
    } = useProductLogic({
        product,
        buttonLabel: "Encomendar",
        deliveryDate,
    })

    const handleOrderClick = (e: React.MouseEvent) => {
        e.preventDefault()
        handleSubmit({ preventDefault() {}, type: "submit" } as React.FormEvent)
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
            discountPrice: product.discountPrice,
            flavor,
            weight,
            category: product.category,
            quantity: qtd,
        }

        dispatch(addToCart(item))
        toast.success(`${product.name} adicionado ao carrinho.`)
    }

    return {
        deliveryDate,
        setDeliveryDate,
        imageIndex,
        qtd,
        formattedPrice,
        formattedDiscountPrice,
        selectedWeight,
        selectedFlavor,
        handleQtd,
        handleSelectWeight,
        handleSelectFlavor,
        handleSubmit,
        handleOrderClick,
        handleAddToCart,
    }
}
