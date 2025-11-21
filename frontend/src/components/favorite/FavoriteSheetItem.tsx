"use client"

import { useDispatch } from "react-redux"
import { HeartOff, TruckElectric } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { removeFromFavorites } from "@/redux/slices/favoriteSlice"
import TextPrice from "../ui/TextPrice"
import { useFavoriteSheetItem } from "@/hooks/favorite/useFavoriteSheetItem"

interface FavoriteItemProps {
    id: string | number
    postImages: string[] | string
    name: string
    price?: number | number[]
    discountPrice?: number | number[]
    [key: string]: any
}

interface Props {
    item: FavoriteItemProps
}

export default function FavoriteSheetItem({ item }: Props) {
    const dispatch = useDispatch()
    const { formattedPrice, formattedDiscountPrice, variants } =
        useFavoriteSheetItem(item)
    const { id, postImages, name } = item

    const imageSrc = Array.isArray(postImages) ? postImages[0] : postImages

    return (
        <AnimatePresence>
            <motion.div
                key={id}
                className="sheetItem"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={variants}
                layout
            >
                <div className="sheetItem__main">
                    <img
                        src={imageSrc}
                        alt={name}
                        className="w-[6rem] h-[6rem] object-cover"
                    />

                    <div className="sheetItem__content">
                        <h1>{name}</h1>

                        <div className="tag">
                            <TruckElectric />
                            Entrega grátis
                        </div>

                        <div className="operations">
                            <section>
                                {formattedDiscountPrice ? (
                                    <div className="currentPrice">
                                        <p>{formattedDiscountPrice}</p>
                                        <span>{formattedPrice}</span>
                                    </div>
                                ) : (
                                    <TextPrice product={item} />
                                )}
                            </section>

                            <button
                                type="button"
                                onClick={() =>
                                    dispatch(removeFromFavorites(id))
                                }
                                className="options--trash"
                            >
                                <HeartOff />
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    )
}
