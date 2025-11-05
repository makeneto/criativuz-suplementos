import { WHATSAPP_NUMBER } from "@/constants/whatsappNumber"
import { formatCurrency } from "@/utils/formatCurrency"
import { formatOrderDate } from "@/utils/formatOrderDate"
import { useMemo } from "react"

export interface CartItem {
    id: string
    name: string
    price: number
    quantity: number
    weight?: string
    flavour?: string
}

export function sendWhatsAppOrder(cartItems: CartItem[], deliveryDate?: Date) {
    const whatsappUrl = useMemo(() => {
        if (!cartItems || cartItems.length === 0) return ""

        const now = new Date()
        const dateToUse = deliveryDate || now

        const formatProduct = (item: CartItem, index: number) => {
            return [
                `${index + 1}️⃣`,
                `*Produto*: ${item.name}`,
                `*Peso*: ${item.weight || "N/A"}`,
                `*Sabor*: ${item.flavour || "N/A"}`,
                `*Preço Unitário*: ${formatCurrency(item.price)}`,
                `*Quantidade*: ${item.quantity}`,
                `*Total*: ${formatCurrency(item.price * item.quantity)}`,
            ].join("\n")
        }

        const productsMessage = cartItems.map(formatProduct).join("\n\n")

        const subtotal = cartItems.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0
        )

        const message = [
            "*ENCOMENDA - CRIATIVUZ SUPLEMENTOS*",
            "",
            "Olá, gostaria de fazer uma encomenda com os seguintes produtos:",
            productsMessage,
            `*Subtotal*: ${formatCurrency(subtotal)}`,
            `*Data de entrega*: ${formatOrderDate(dateToUse)}`,
            "",
            "Por favor, confirma a disponibilidade e o prazo de entrega.",
            "Fico a aguardar o retorno.",
        ].join("\n")

        return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
            message
        )}`
    }, [cartItems, deliveryDate])

    return { whatsappUrl }
}
