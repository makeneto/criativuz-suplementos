import { WHATSAPP_NUMBER } from "@/constants/whatsappNumber"
import { formatCurrency } from "@/utils/formatCurrency"
import { formatOrderDate } from "@/utils/formatOrderDate"

export interface CartItem {
    id: string
    name: string
    price: number | number[]
    discountPrice?: number | number[]
    quantity: number
    weight?: string
    flavor?: string
}

interface SendWhatsAppOrderProps {
    cartItems: CartItem[]
    deliveryDate?: Date
    subtotal?: number
}

export function sendWhatsAppOrder({
    cartItems,
    deliveryDate,
    subtotal,
}: SendWhatsAppOrderProps) {
    if (!cartItems || cartItems.length === 0) return { whatsappUrl: "" }

    const now = new Date()
    const dateToUse = deliveryDate || now

    const formatProduct = (item: CartItem, index: number) => {
        const basePrice = Array.isArray(item.price) ? item.price[0] : item.price
        const baseDiscount = Array.isArray(item.discountPrice)
            ? item.discountPrice[0]
            : item.discountPrice

        const finalUnitPrice =
            baseDiscount && baseDiscount > 0 ? baseDiscount : basePrice
        const totalPrice = finalUnitPrice * item.quantity

        return [
            `${index + 1}️⃣`,
            `*Produto*: ${item.name}`,
            `*Peso*: ${item.weight || "N/A"}`,
            `*Sabor*: ${item.flavor || "N/A"}`,
            `*Preço Unitário*: ${formatCurrency(finalUnitPrice)}`,
            `*Quantidade*: ${item.quantity}`,
            `*Total*: ${formatCurrency(totalPrice)}`,
        ].join("\n")
    }

    const productsMessage = cartItems.map(formatProduct).join("\n\n")

    const formattedSubtotal =
        subtotal !== undefined
            ? formatCurrency(subtotal)
            : formatCurrency(
                  cartItems.reduce((acc, item) => {
                      const basePrice = Array.isArray(item.price)
                          ? item.price[0]
                          : item.price
                      const baseDiscount = Array.isArray(item.discountPrice)
                          ? item.discountPrice[0]
                          : item.discountPrice
                      const finalUnitPrice =
                          baseDiscount && baseDiscount > 0
                              ? baseDiscount
                              : basePrice
                      return acc + finalUnitPrice * item.quantity
                  }, 0)
              )

    const message = [
        "*ENCOMENDA - CRIATIVUZ SUPLEMENTOS*",
        "",
        "Olá, gostaria de fazer uma encomenda com os seguintes produtos:",
        productsMessage,
        "",
        `*Subtotal*: ${formattedSubtotal}`,
        `*Data de entrega*: ${formatOrderDate(dateToUse)}`,
        "",
        "Por favor, confirma a disponibilidade e o prazo de entrega.",
        "Fico a aguardar o retorno.",
    ].join("\n")

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
        message
    )}`

    return { whatsappUrl }
}
