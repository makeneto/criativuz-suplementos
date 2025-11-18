import { Heart, HeartOff } from "lucide-react"
import useFavoriteHelpers from "@/hooks/useFavoriteHelpers"

export default function ProductHeader({
    product,
    price,
    discountPrice,
}: {
    product?: any
    price: string
    discountPrice?: string
}) {
    const { addFavorite, isFavoriteFor } = useFavoriteHelpers()
    const isFavorite = isFavoriteFor(product)

    return (
        <header>
            <div>
                <h2>{product.name}</h2>
                {discountPrice ? (
                    <div>
                        <p>{discountPrice}</p>
                        <span>{price}</span>
                    </div>
                ) : (
                    <p>{price}</p>
                )}
            </div>

            <button
                type="button"
                onClick={() => addFavorite(product as any)}
                className={`productItem ${
                    isFavorite ? "activatedItem" : "deactivatedItem"
                }`}
                aria-pressed={isFavorite}
            >
                {isFavorite ? <HeartOff /> : <Heart />}
            </button>
        </header>
    )
}
