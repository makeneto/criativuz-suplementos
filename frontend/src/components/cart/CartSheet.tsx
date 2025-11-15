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

import { RootState } from "@/redux/store"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Badge } from "../ui/badge"
import CartSheetItem from "./CartSheetItem"
import { useAppSelector } from "@/redux/hooks"
import { useID } from "@/hooks/useID"

export default function CartSheet() {
    const cartItems = useAppSelector((state: RootState) => state.cart.items)
    const { length: cartLength } = cartItems
    const [open, setOpen] = useState(false)
    const router = useRouter()
    const randomId = useID()

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <div className="userAction">
                    <ShoppingCart className="w-5 h-5" />
                    <p>
                        Carrinho
                        {cartLength > 0 && (
                            <Badge
                                className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
                                variant="destructive"
                            >
                                {cartLength}
                            </Badge>
                        )}
                    </p>
                </div>
            </SheetTrigger>

            <SheetContent>
                <SheetHeader>
                    <SheetTitle className="text-lg font-semibold">
                        Carrinho{" "}
                        {cartLength > 0 && (
                            <span className="cartLength">({cartLength})</span>
                        )}
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

                <div className="mt-5 flex flex-col h-[87%]">
                    {cartLength === 0 ? (
                        <div className="miniEmptySheet">
                            <img
                                src="/images/empty-cart.webp"
                                alt="Empty Sheet"
                            />
                        </div>
                    ) : (
                        cartItems.map((item) => (
                            <CartSheetItem
                                key={`${item.id}-${randomId}`}
                                item={item}
                            />
                        ))
                    )}
                </div>
            </SheetContent>
        </Sheet>
    )
}
