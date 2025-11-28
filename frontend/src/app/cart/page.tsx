"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

import CartHeader from "@/components/cart/CartHeader"
import CartTable from "@/components/cart/CartTable"
import CartSummary from "@/components/cart/CartSummary"
import EmptyCart from "@/components/cart/EmptyCart"
import { useCartItems } from "@/hooks/cart/useCartItems"
import { useWhatsAppOrder } from "@/hooks/product/useWhatsAppOrder"
import { useMediaQuery } from "react-responsive"
import MobileCartList from "@/components/cart/MobileCartList"

export default function Cart() {
    const router = useRouter()
    const [deliveryDate, setDeliveryDate] = useState<Date | undefined>()
    const { cartItems, subtotal } = useCartItems()
    const { whatsappUrl } = useWhatsAppOrder(cartItems, deliveryDate, subtotal)
    const currentYear = new Date().getFullYear()

    const isMobile = useMediaQuery({ maxWidth: 640 })

    return (
        <main className="cartPage">
            <CartHeader
                length={cartItems.length}
                onBack={() => router.back()}
            />
            {cartItems.length > 0 ? (
                <>
                    {!isMobile ? (
                        <CartTable />
                    ) : (
                        <MobileCartList subtotal={subtotal} />
                    )}

                    <CartSummary
                        subtotal={subtotal}
                        deliveryDate={deliveryDate}
                        setDeliveryDate={setDeliveryDate}
                        whatsappUrl={whatsappUrl}
                        currentYear={currentYear}
                    />
                </>
            ) : (
                <EmptyCart />
            )}
        </main>
    )
}
