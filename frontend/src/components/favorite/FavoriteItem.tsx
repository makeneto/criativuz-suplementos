import React from "react"
import { useDispatch } from "react-redux"
// import { removeFromFavorite } from "@/redux/slices/FavoriteSlice"
import { Trash, TruckElectric } from "lucide-react"
import { formatCurrency } from "@/utils/formatCurrency"
import ProductQuantity from "../ui/ProductQuantity"
import { motion, AnimatePresence } from "framer-motion"
// import { addToFavorites, FavoriteItem } from "@/redux/slices/favoriteSlice"

interface FavoriteItemProps {
    id: string
    image: string
    name: string
    weight: string
    flavor: string
    price: number
}

interface ItemsProps {
    item: FavoriteItemProps
}

export default function FavoriteItem({ item }: ItemsProps) {
    const dispatch = useDispatch()
    const { id, image, name, weight, flavor, price } = item

    const variants = {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: 50, transition: { duration: 0.3 } },
    }

    // const handleMovetoFavorites = (item: FavoriteItem) => {
    //     dispatch(
    //         addToFavorites({
    //             id: item.id,
    //             name: item.name,
    //             weight: item.weight,
    //             flavor: item.flavor,
    //             price: item.price,
    //         })
    //     )
    // }

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
                                Sabor: <span>{flavor}</span>
                            </p>
                        </div>

                        <div className="tag" style={{ marginBottom: "1rem" }}>
                            <TruckElectric />
                            Entrega grátis
                        </div>

                        <div className="operations">
                            <h2>{formatCurrency(price)}</h2>
                            <button
                                type="button"
                                // onClick={() => dispatch(removeFromCart(id))}
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
