import { motion, AnimatePresence } from "framer-motion"
import CartItemRow from "./CartItemRow"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"

const variants = {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 40, transition: { duration: 0.3 } },
}

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
                            variants={variants}
                        />
                    ))}
                </AnimatePresence>
            </tbody>
        </table>
    )
}
