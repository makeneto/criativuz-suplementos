import { useDispatch } from "react-redux"
import { addToFavorites, FavoriteItem } from "@/redux/slices/favoriteSlice"

export function useAddToFavorites() {
    const dispatch = useDispatch()

    const add = (item: FavoriteItem) => {
        dispatch(
            addToFavorites({
                id: item.id,
                image: item.image,
                name: item.name,
                weight: item.weight,
                flavor: item.flavor,
                price: item.price,
            })
        )
    }

    return { add }
}
