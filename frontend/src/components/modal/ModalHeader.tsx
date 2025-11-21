import useFavoriteHelpers from "@/hooks/favorite/useFavoriteHelpers"
import { Heart, HeartOff, X } from "lucide-react"

interface Props {
    product: any
    setProduct: (p: any) => void
}

export default function ModalHeader({ product, setProduct }: Props) {
    const { addFavorite, isFavoriteFor } = useFavoriteHelpers()
    const isFavorite = isFavoriteFor(product)

    return (
        <div className="modalHeader">
            <button
                type="button"
                onClick={() => setProduct(null)}
                className="modalProduct__container--closeButton"
            >
                <X size={20} />
            </button>

            <button
                type="button"
                onClick={() => addFavorite(product as any)}
                className={`productFav ${
                    isFavorite ? "activatedFav" : "deactivatedFav"
                }`}
                aria-pressed={isFavorite}
            >
                {isFavorite ? <HeartOff /> : <Heart />}
            </button>
        </div>
    )
}
