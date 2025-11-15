import { useDispatch } from "react-redux"
import { addToFavorites, FavoriteItem } from "@/redux/slices/favoriteSlice"

export function useAddToFavorites() {
    const dispatch = useDispatch()

    const add = (item: FavoriteItem) => {
        dispatch(
            addToFavorites({
                id: item.id,
                postImages: item.postImages,
                name: item.name,
                price: item.price,
                discountPrice: item.discountPrice,
            })
        )
    }

    return { add }
}
