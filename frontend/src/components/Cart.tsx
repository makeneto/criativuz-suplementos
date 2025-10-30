"use client"

import {
    Sheet,
    SheetTrigger,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetFooter,
    SheetClose,
} from "@/components/ui/sheet"
import { ShoppingCart } from "lucide-react"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import CartItem from "./CartItem"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"

export default function Cart() {
    const cartItems = useSelector((state: RootState) => state.cart.items)

    return (
        <Sheet>
            <SheetTrigger asChild>
                <div className="userAction">
                    <ShoppingCart className="w-5 h-5" />
                    <p>
                        Carrinho
                        {cartItems.length > 0 && (
                            <Badge
                                className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
                                variant="destructive"
                            >
                                {cartItems.length}
                            </Badge>
                        )}
                    </p>
                </div>
            </SheetTrigger>

            <SheetContent>
                <SheetHeader>
                    <SheetTitle className="text-lg font-semibold">
                        Carrinho
                    </SheetTitle>
                </SheetHeader>

                <div className="mt-6 flex flex-col gap-4">
                    {cartItems.length === 0 ? (
                        <p className="text-center text-muted-foreground">
                            O carrinho está vazio 🛒
                        </p>
                    ) : (
                        cartItems.map((item) => <CartItem item={item} />)
                    )}
                </div>

                {cartItems.length > 0 && (
                    <SheetFooter className="mt-6 flex flex-col gap-2">
                        <Button className="w-full">Finalizar Compra</Button>
                        <SheetClose asChild>
                            <Button variant="outline" className="w-full">
                                Fechar
                            </Button>
                        </SheetClose>
                    </SheetFooter>
                )}
            </SheetContent>
        </Sheet>
    )
}
