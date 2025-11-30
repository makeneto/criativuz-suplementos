import { useAppSelector } from "@/redux/hooks"
import { RootState } from "@/redux/store"
import MobileCartItem from "./MobileCartItem"
import { formatCurrency } from "@/utils/formatCurrency"
import { FieldSeparator } from "../ui/field"
import { useMediaQuery } from "react-responsive"
import { Activity } from "react"

export default function MobileCartList({ subtotal }: any) {
    const cartItems = useAppSelector((state: RootState) => state.cart.items)

    const isMobile = useMediaQuery({ maxWidth: 639 })

    return (
        <main className="grid gap-5 sm:gap-16">
            <Activity mode={isMobile ? "visible" : "hidden"}>
                <span className="flex gap-2 items-end">
                    <p className="lightTag">Subtotal:</p>
                    <h1 className="font-semibold text-[1rem] text-red-500">
                        {formatCurrency(subtotal)}
                    </h1>
                </span>
            </Activity>

            <FieldSeparator />

            <ul>
                {cartItems.map((item) => (
                    <MobileCartItem item={item} />
                ))}
            </ul>
        </main>
    )
}
