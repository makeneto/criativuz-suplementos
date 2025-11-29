"use client"

import FavoriteSheetItem from "@/components/favorite/FavoriteSheetItem"
import { useFavoriteSheet } from "@/hooks/favorite/useFavoriteSheet"

export default function FavoritesPage() {
    const { randomId, favoriteItems } = useFavoriteSheet()
    const favoriteLength = favoriteItems.length

    return (
        <div className="mt-32 mb-24 grid gap-4 px-4">
            {favoriteLength === 0 ? (
                <div className="miniEmptySheet">
                    <img src="/images/empty-cart.webp" alt="Empty favorite" />
                </div>
            ) : (
                favoriteItems.map((item) => (
                    <FavoriteSheetItem
                        key={`${item.id}-${randomId}`}
                        item={item}
                    />
                ))
            )}
        </div>
    )
}
