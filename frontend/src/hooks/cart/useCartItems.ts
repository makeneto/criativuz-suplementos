import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import { useMemo } from "react"

export function useCartItems() {
    const cartItems = useSelector((state: RootState) => state.cart.items)

    const subtotal = useMemo(
        () =>
            cartItems.reduce((acc, item) => {
                const basePrice = Array.isArray(item.price)
                    ? item.price[0]
                    : item.price
                const baseDiscount = Array.isArray(item.discountPrice)
                    ? item.discountPrice[0]
                    : item.discountPrice
                const finalPrice =
                    baseDiscount && baseDiscount > 0 ? baseDiscount : basePrice
                return acc + finalPrice * item.quantity
            }, 0),
        [cartItems]
    )

    return { cartItems, subtotal }
}
