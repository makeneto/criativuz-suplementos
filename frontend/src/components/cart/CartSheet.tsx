"use client"

import {
    Sheet,
    SheetTrigger,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetClose,
} from "@/components/ui/sheet"
import { ShoppingCart, X } from "lucide-react"
import { useSelector } from "react-redux"

import { RootState } from "@/redux/store"
import { useRouter } from "next/navigation"
import { Activity, useState } from "react"
import { Badge } from "../ui/badge"
import CartItem from "./CartItem"

export default function CartSheet() {
    const cartItems = useSelector((state: RootState) => state.cart.items)
    const { length: cartLength } = cartItems
    const [open, setOpen] = useState(false)
    const router = useRouter()

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <div className="userAction">
                    <ShoppingCart className="w-5 h-5" />
                    <p>
                        Carrinho
                        <Activity mode={cartLength > 0 ? "visible" : "hidden"}>
                            <Badge
                                className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
                                variant="destructive"
                            >
                                {cartLength}
                            </Badge>
                        </Activity>
                    </p>
                </div>
            </SheetTrigger>

            <SheetContent>
                <SheetHeader>
                    <SheetTitle className="text-lg font-semibold">
                        Carrinho{" "}
                        <Activity mode={cartLength > 0 ? "visible" : "hidden"}>
                            <span className="cartLength">({cartLength})</span>
                        </Activity>
                    </SheetTitle>

                    {cartLength > 0 ? (
                        <button
                            onClick={() => {
                                setOpen(false)
                                router.push("/cart")
                            }}
                            className="vewAllLink"
                        >
                            Ver todos
                        </button>
                    ) : (
                        <SheetClose className="closeSheetButton">
                            <X size={20} />
                        </SheetClose>
                    )}
                </SheetHeader>

                <div className="mt-8 flex flex-col gap-4 h-[87%]">
                    {cartLength === 0 ? (
                        <div className="miniEmptyCart">
                            <img
                                src="/images/empty-cart.webp"
                                alt="Empty Cart"
                            />
                        </div>
                    ) : (
                        cartItems.map((item) => (
                            <CartItem key={item.id} item={item} />
                        ))
                    )}
                </div>
            </SheetContent>
        </Sheet>
    )
}
