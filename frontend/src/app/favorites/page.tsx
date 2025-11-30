"use client"

import FavoriteSheetItem from "@/components/favorite/FavoriteSheetItem"
import { useFavoriteSheet } from "@/hooks/favorite/useFavoriteSheet"

export default function FavoritesPage() {
    const { randomId, favoriteItems } = useFavoriteSheet()
    const favoriteLength = favoriteItems.length

    return (
        <div className="mt-32 mb-24 px-4">
            {favoriteLength === 0 ? (
                <div className="miniEmptySheet">
                    <img src="/images/empty-cart.webp" alt="Empty favorite" />
                </div>
            ) : (
                <div className="grid md:grid-cols-2 md:items-center gap-[0__5rem]">
                    {favoriteItems.map((item) => (
                        <FavoriteSheetItem
                            key={`${item.id}-${randomId}`}
                            item={item}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}
