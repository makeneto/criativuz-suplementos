import { AnimatePresence } from "framer-motion"
import CartItemRow from "./CartItemRow"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import { VARIANT_ANIMATED } from "@/constants/variantAnimated"

export default function CartTable() {
    const cartItems = useSelector((state: RootState) => state.cart.items)

    return (
        <table className="cartTable">
            <thead>
                <tr>
                    <th>Produto</th>
                    <th></th>
                    <th>Preço</th>
                    <th>Quantidade</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                <AnimatePresence mode="popLayout">
                    {cartItems.map((item) => (
                        <CartItemRow
                            key={item.id}
                            item={item}
                            variants={VARIANT_ANIMATED}
                        />
                    ))}
                </AnimatePresence>
            </tbody>
        </table>
    )
}
