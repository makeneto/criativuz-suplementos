"use client"

import { Activity, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "@/redux/store"
import { ArrowLeft, Trash, TruckElectric } from "lucide-react"
import { removeFromCart } from "@/redux/slices/cartSlice"
import { motion, AnimatePresence } from "framer-motion"
import { formatCurrency } from "@/utils/formatCurrency"
import { Calendar22 } from "@/components/ui/Calendar22"
import EmptyCart from "@/components/cart/EmptyCart"
import { useRouter } from "next/navigation"
import ProductQuantity from "@/components/ui/ProductQuantity"
import { useCartQuantity } from "@/hooks/useCartQuantity"
import { sendWhatsAppOrder } from "@/utils/sendWhatsAppOrder"
import Link from "next/link"

export default function Cart() {
    const router = useRouter()
    const dispatch = useDispatch()
    const cartItems = useSelector((state: RootState) => state.cart.items)
    const [deliveryDate, setDeliveryDate] = useState<Date | undefined>()

    const { whatsappUrl } = sendWhatsAppOrder(cartItems, deliveryDate)

    const totalGeral = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    )

    const variants = {
        hidden: { opacity: 0, x: 40 },
        visible: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: 40, transition: { duration: 0.3 } },
    }

    const now = new Date()
    const currentYear = now.getFullYear()

    return (
        <main className="cartPage">
            <header className="cartPage__header">
                <h1 className="cartPage__header--title">
                    🛒 Carrinho {cartItems.length === 0 && "está vazio"}
                </h1>
                <p onClick={() => router.back()}>
                    <ArrowLeft size={18} />
                    Voltar
                </p>
            </header>

            {cartItems.length > 0 ? (
                <>
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
                                {cartItems.map((item) => {
                                    const { qtd, handleQtd } = useCartQuantity(
                                        item.id,
                                        item.quantity
                                    )

                                    return (
                                        <motion.tr
                                            key={item.id}
                                            className="cartItem"
                                            variants={variants}
                                            initial="hidden"
                                            animate="visible"
                                            exit="exit"
                                            layout
                                        >
                                            <td className="cartTable__product">
                                                <div className="product__imageWrapper">
                                                    <Activity
                                                        mode={
                                                            item.image
                                                                ? "visible"
                                                                : "hidden"
                                                        }
                                                    >
                                                        <img
                                                            src={item.image}
                                                            alt={item.name}
                                                            className="product__image"
                                                        />
                                                    </Activity>

                                                    <button
                                                        className="product__removeBtn"
                                                        onClick={() =>
                                                            dispatch(
                                                                removeFromCart(
                                                                    item.id
                                                                )
                                                            )
                                                        }
                                                        title="Remover produto"
                                                    >
                                                        <Trash size={16} />
                                                    </button>
                                                </div>

                                                <div className="product__intro">
                                                    <div className="product__info">
                                                        <p className="product__name">
                                                            {item.name}
                                                        </p>
                                                        <div className="product__details">
                                                            <Activity
                                                                mode={
                                                                    item.weight
                                                                        ? "visible"
                                                                        : "hidden"
                                                                }
                                                            >
                                                                <p className="product__detail">
                                                                    Peso:{" "}
                                                                    <span>
                                                                        {
                                                                            item.weight
                                                                        }
                                                                    </span>
                                                                </p>
                                                            </Activity>

                                                            <Activity
                                                                mode={
                                                                    item.flavor
                                                                        ? "visible"
                                                                        : "hidden"
                                                                }
                                                            >
                                                                <p className="product__detail">
                                                                    Sabor:{" "}
                                                                    <span>
                                                                        {
                                                                            item.flavor
                                                                        }
                                                                    </span>
                                                                </p>
                                                            </Activity>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>

                                            <td>
                                                <div className="tag">
                                                    <TruckElectric size={14} />
                                                    <span>Entrega grátis</span>
                                                </div>
                                            </td>

                                            <td>
                                                {formatCurrency(item.price)}
                                            </td>

                                            <td>
                                                <ProductQuantity
                                                    isSmall={true}
                                                    qtd={qtd}
                                                    onAdd={() =>
                                                        handleQtd("add")
                                                    }
                                                    onSubtract={() =>
                                                        handleQtd("subtract")
                                                    }
                                                />
                                            </td>

                                            <td>
                                                {formatCurrency(
                                                    item.price * qtd
                                                )}
                                            </td>
                                        </motion.tr>
                                    )
                                })}
                            </AnimatePresence>
                        </tbody>
                    </table>

                    <section className="cartPage__total">
                        <div>
                            <p>
                                Subtotal:
                                <span>{formatCurrency(totalGeral)}</span>
                            </p>

                            <Calendar22
                                date={deliveryDate}
                                setDate={setDeliveryDate}
                            />
                        </div>

                        <span>
                            <Link
                                href={whatsappUrl}
                                type="button"
                                className="orderCart"
                            >
                                Encomendar
                            </Link>
                            <p>© {currentYear} Criativuz Suplementos.</p>
                        </span>
                    </section>
                </>
            ) : (
                <EmptyCart />
            )}
        </main>
    )
}
