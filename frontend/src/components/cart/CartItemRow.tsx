import { Trash, TruckElectric } from "lucide-react"
import { motion } from "framer-motion"
import { useDispatch } from "react-redux"
import { removeFromCart } from "@/redux/slices/cartSlice"
import ProductQuantity from "../ui/ProductQuantity"
import TextPrice from "../ui/TextPrice"
import { useCartQuantity } from "@/hooks/cart/useCartQuantity"

export default function CartItemRow({ item, variants }: any) {
    const dispatch = useDispatch()
    const { qtd, handleQtd } = useCartQuantity(item.id, item.quantity)

    return (
        <motion.tr
            className="cartItem"
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="exit"
            layout
        >
            <td className="cartTable__product">
                <div className="product__imageWrapper">
                    {item.image && (
                        <img
                            src={item.image}
                            alt={item.name}
                            className="product__image"
                        />
                    )}
                    <button
                        className="product__removeBtn"
                        onClick={() => dispatch(removeFromCart(item.id))}
                        title="Remover produto"
                    >
                        <Trash size={16} />
                    </button>
                </div>
                <div className="product__intro">
                    <div className="product__info">
                        <p className="product__name">{item.name}</p>
                        <div className="product__details">
                            {item.weight && (
                                <p className="product__detail">
                                    Peso: <span>{item.weight}</span>
                                </p>
                            )}
                            {item.flavor && (
                                <p className="product__detail">
                                    Sabor: <span>{item.flavor}</span>
                                </p>
                            )}
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
                <TextPrice product={item} isLight isTable={true} />
            </td>
            <td>
                <ProductQuantity
                    isSmall
                    qtd={qtd}
                    onAdd={() => handleQtd("add")}
                    onSubtract={() => handleQtd("subtract")}
                />
            </td>
            <td>
                <TextPrice product={item} qtd={qtd} isTable={true} />
            </td>
        </motion.tr>
    )
}
