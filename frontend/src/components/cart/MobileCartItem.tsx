import { useDispatch } from "react-redux"
import { motion, AnimatePresence } from "framer-motion"
import { Trash, TruckElectric } from "lucide-react"

import { normalizeFavorite } from "@/utils/normalizeFavorite"
import TextPrice from "../ui/TextPrice"
import ProductQuantity from "../ui/ProductQuantity"
import { VARIANT_ANIMATED } from "@/constants/variantAnimated"
import { useAddToFavorites } from "@/hooks/favorite/useAddToFavorite"
import { useCartQuantity } from "@/hooks/cart/useCartQuantity"
import { removeFromCart } from "@/redux/slices/cartSlice"
import { memo } from "react"

const MobileCartItem = memo(function MobileCartItem({ item }: any) {
    const dispatch = useDispatch()
    const { id, image, name, weight, flavor, quantity } = item
    const { qtd, handleQtd } = useCartQuantity(id, quantity)
    const { add } = useAddToFavorites()

    return (
        <AnimatePresence>
            <motion.li
                key={id}
                className="sheetItem"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={VARIANT_ANIMATED}
                layout
            >
                <div className="sheetItem__main">
                    <img
                        src={image}
                        alt={name}
                        className="w-[6rem] h-[6rem] object-cover"
                    />

                    <div className="sheetItem__content">
                        <h1>{name}</h1>

                        <div className="sheetItem__content--details">
                            <p>
                                Peso: <span>{weight}</span>
                            </p>
                            <p>
                                Sabor: <span>{flavor}</span>
                            </p>
                        </div>

                        <div className="tag" style={{ marginBottom: "1rem" }}>
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
                            <h2 className="font-semibold">
                                <TextPrice product={item} qtd={qtd} />
                            </h2>
                        </div>

                        <div className="options">
                            <p onClick={() => add(normalizeFavorite(item))}>
                                Mover para os Favoritos
                            </p>{" "}
                            |
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
            </motion.li>
        </AnimatePresence>
    )
})

export default MobileCartItem
