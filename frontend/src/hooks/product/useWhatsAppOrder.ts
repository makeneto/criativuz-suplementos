import { sendWhatsAppOrder } from "@/utils/sendWhatsAppOrder"

export function useWhatsAppOrder(
    cartItems: any[],
    deliveryDate?: Date,
    subtotal?: number
) {
    return sendWhatsAppOrder({ cartItems, deliveryDate, subtotal })
}
