import React from "react"
import { useDispatch } from "react-redux"
import { HeartOff, TruckElectric } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { removeFromFavorites } from "@/redux/slices/favoriteSlice"
import TextPrice from "../ui/TextPrice"

interface FavoriteItemProps {
    id: string
    postImages: string[] | string
    name: string
}

interface ItemsProps {
    item: FavoriteItemProps
}

export default function FavoriteSheetItem({ item }: ItemsProps) {
    const dispatch = useDispatch()
    const { id, postImages, name } = item

    const variants = {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: 50, transition: { duration: 0.3 } },
    }

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
                        src={Array.isArray(postImages) ? postImages[0] : postImages}
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
                            <TextPrice product={item} />

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
