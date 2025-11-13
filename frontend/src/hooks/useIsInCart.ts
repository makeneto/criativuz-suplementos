"use client"

import { useEffect, useState } from "react"
import { CartItem } from "@/redux/slices/cartSlice"

export function useIsInCart(item: CartItem | null) {
    const [isInCart, setIsInCart] = useState(false)

    useEffect(() => {
        if (!item) return

        const check = () => {
            try {
                const stored = localStorage.getItem("criativCart")
                if (!stored) return setIsInCart(false)

                const cart: CartItem[] = JSON.parse(stored)
                const exists = cart.some(
                    (i) =>
                        i.name === item.name &&
                        i.weight === item.weight &&
                        i.flavor === item.flavor
                )
                setIsInCart(exists)
            } catch {
                setIsInCart(false)
            }
        }

        check()

        const handleCartChange = () => check()

        window.addEventListener("storage", handleCartChange)
        window.addEventListener("cartUpdated", handleCartChange)

        const originalSetItem = localStorage.setItem
        localStorage.setItem = function (...args) {
            originalSetItem.apply(this, args)
            if (args[0] === "criativCart") {
                window.dispatchEvent(new Event("cartUpdated"))
            }
        }

        return () => {
            window.removeEventListener("storage", handleCartChange)
            window.removeEventListener("cartUpdated", handleCartChange)
            localStorage.setItem = originalSetItem
        }
    }, [item?.name, item?.weight, item?.flavor])

    return isInCart
}
