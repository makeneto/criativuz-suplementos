import React from "react"
import { useDispatch } from "react-redux"
import { removeFromCart } from "@/redux/slices/cartSlice"
import { Trash, TruckElectric } from "lucide-react"
import { formatCurrency } from "@/utils/formatCurrency"
import ProductQuantity from "./ui/ProductQuantity"
import { useCartQuantity } from "@/hooks/useCartQuantity"
import { motion, AnimatePresence } from "framer-motion"

interface CartItemProps {
    id: string
    image: string
    name: string
    weight: string
    flavour: string
    category: string
    price: number
    quantity: number
}

interface ItemsProps {
    item: CartItemProps
}

export default function CartItem({ item }: ItemsProps) {
    const dispatch = useDispatch()
    const { id, image, name, weight, flavour, price, quantity } = item
    const { qtd, handleQtd } = useCartQuantity(id, quantity)

    // Framer Motion variants
    const variants = {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: 50, transition: { duration: 0.3 } },
    }

    return (
        <AnimatePresence>
            <motion.div
                key={id}
                className="cartItem"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={variants}
                layout
            >
                <div className="cartItem__main">
                    <img
                        src={image}
                        alt={name}
                        className="w-[6rem] h-[6rem] object-cover"
                    />

                    <div className="cartItem__content">
                        <h1>{name}</h1>

                        <div className="cartItem__content--details">
                            <p>
                                Peso: <span>{weight}</span>
                            </p>
                            <p>
                                Sabor: <span>{flavour}</span>
                            </p>
                        </div>

                        <div className="tag">
                            <TruckElectric />
                            Entrega grátis
                        </div>

                        <div className="operations">
                            <ProductQuantity
                                isSmall={true}
                                qtd={qtd}
                                onAdd={() => handleQtd("add")}
                                onSubtract={() => handleQtd("subtract")}
                            />
                            <h2>{formatCurrency(price * qtd)}</h2>
                        </div>

                        <div className="options">
                            <p>Mover para os Favoritos</p> |
                            <button
                                type="button"
                                onClick={() => dispatch(removeFromCart(id))}
                                className="options--trash"
                            >
                                <Trash />
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    )
}
