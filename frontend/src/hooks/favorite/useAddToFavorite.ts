import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import {
    addToFavorites,
    FavoriteItem,
    removeFromFavorites,
} from "@/redux/slices/favoriteSlice"

export function useAddToFavorites() {
    const dispatch = useAppDispatch()
    const favorites = useAppSelector(
        (state: any) => state.favorites?.items ?? []
    )

    const normalizeId = (v: any) =>
        v === null || v === undefined ? "" : String(v)

    const resolveIdFrom = (obj: any) =>
        normalizeId(
            obj?.id ??
                obj?._id ??
                obj?.productId ??
                obj?.product?.id ??
                (typeof obj === "string" ? obj : "")
        )

    const add = (item: FavoriteItem | null | undefined) => {
        const itemId = resolveIdFrom(item)
        if (!itemId) return

        const exists =
            Array.isArray(favorites) &&
            favorites.some((f: any) => resolveIdFrom(f) === itemId)

        if (exists) {
            dispatch(removeFromFavorites(itemId))
            return
        }

        const candidatePostImages = (item as any)?.postImages
        const singleImage = (item as any)?.image

        const postImages =
            Array.isArray(candidatePostImages) && candidatePostImages.length
                ? candidatePostImages
                : singleImage
                ? [singleImage]
                : []

        dispatch(
            addToFavorites({
                id: itemId,
                postImages,
                name: (item as any)?.name ?? "",
                price: (item as any)?.price ?? 0,
                discountPrice: (item as any)?.discountPrice ?? undefined,
            })
        )
    }

    return { add, favorites }
}
