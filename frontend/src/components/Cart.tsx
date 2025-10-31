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

import { Badge } from "./ui/badge"
import CartItem from "./CartItem"
import { RootState } from "@/redux/store"
import Link from "next/link"

export default function Cart() {
    const cartItems = useSelector((state: RootState) => state.cart.items)

    const { length: cartLength } = cartItems

    return (
        <Sheet>
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
                        <Link href="/cart" className="vewAllLink">
                            Ver todos
                        </Link>
                    ) : (
                        <SheetClose>
                            <div className="closeSheetButton">
                                <X size={20} />
                            </div>
                        </SheetClose>
                    )}
                </SheetHeader>

                <div className="mt-8 flex flex-col gap-4 h-[87%]">
                    {cartLength === 0 ? (
                        <div className="noItem">
                            <p className="text-center text-muted-foreground">
                                O carrinho está vazio 🛒
                            </p>
                        </div>
                    ) : (
                        cartItems.map((item) => <CartItem item={item} />)
                    )}
                </div>
            </SheetContent>
        </Sheet>
    )
}
