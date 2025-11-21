import { useCallback } from "react"
import { useAddToFavorites } from "@/hooks/favorite/useAddToFavorite"

const normalizeId = (v: any) => (v === null || v === undefined ? "" : String(v))

export default function useFavoriteHelpers() {
    const { add, favorites } = useAddToFavorites()

    const determineId = useCallback((item: any) => {
        if (typeof item === "string") return normalizeId(item)
        return normalizeId(
            item?.id ?? item?._id ?? item?.productId ?? item?.product?.id
        )
    }, [])

    const isFavoriteFor = useCallback(
        (item: any) => {
            const prodId = determineId(item)
            if (!Array.isArray(favorites) || prodId === "") return false

            return favorites.some((f: any) => {
                const favId = determineId(
                    f?.id ??
                        f?._id ??
                        f?.productId ??
                        f?.product?.id ??
                        (typeof f === "string" ? f : "")
                )
                return favId !== "" && favId === prodId
            })
        },
        [favorites, determineId]
    )

    return {
        determineId,
        isFavoriteFor,
        addFavorite: add,
        favorites,
    }
}
