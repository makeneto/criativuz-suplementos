"use client"

import { Heart, HeartOff, X } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import ProductOptions from "../ui/ProductOptions"
import ProductQuantity from "../ui/ProductQuantity"
import { useProductLogic } from "@/hooks/product/useProductLogic"
import { Schedule } from "../ui/Schedule"
import { useIsInCart } from "@/hooks/cart/useIsInCart"
import useFavoriteHelpers from "@/hooks/favorite/useFavoriteHelpers"
import { ProductModalProps } from "@/interfaces/interfaces"
import PModalImage from "../modal/PModalImage"

export default function ProductModal({
    product,
    setProduct,
    onSubmit,
}: ProductModalProps) {
    const [deliveryDate, setDeliveryDate] = useState<Date | undefined>()
    const { addFavorite, isFavoriteFor } = useFavoriteHelpers()

    const {
        imageIndex,
        qtd,
        formattedPrice,
        formattedDiscountPrice,
        selectedWeight,
        selectedFlavor,
        handleQtd,
        handleSelectWeight,
        handleSelectFlavor,
        handleAddToCart,
        handleOrder,
    } = useProductLogic({
        product,
        onSubmit,
        setProduct,
        deliveryDate,
    })

    const normalizeId = (v: any) =>
        v === null || v === undefined ? "" : String(v)

    const prodId =
        normalizeId(
            product?.id ??
                product?._id ??
                product?.productId ??
                product?.product?.id
        ) ?? ""

    const isFavorite = isFavoriteFor(product)

    const itemData =
        selectedWeight && selectedFlavor
            ? {
                  id: prodId || "",
                  name: product.name,
                  image: product.postImages[0],
                  price: 0,
                  discountPrice: 0,
                  flavor: selectedFlavor,
                  weight: selectedWeight,
                  category: "unknown",
                  quantity: 1,
              }
            : null

    const isInCart = useIsInCart(itemData)

    const handleAddClick = () => {
        handleAddToCart()
        window.dispatchEvent(new Event("cartUpdated"))
    }

    return (
        <div className="modalOverlay">
            <div className="modalProduct">
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

                <div className="modalProduct__container">
                    <PModalImage
                        src={product.postImages[imageIndex]}
                        alt={product.name}
                    />

                    <form className="modalProduct__container--content">
                        <header>
                            <h2>{product.name}</h2>
                            {formattedDiscountPrice ? (
                                <div className="currentPrice">
                                    <p>{formattedDiscountPrice}</p>
                                    <span>{formattedPrice}</span>
                                </div>
                            ) : (
                                <p>{formattedPrice}</p>
                            )}
                        </header>

                        {product.description?.synopsis && (
                            <p className="modalProduct__container--content--description">
                                {product.description?.synopsis}
                            </p>
                        )}

                        <ProductOptions
                            weights={product.weight}
                            flavors={product.flavors}
                            selectedWeight={selectedWeight}
                            selectedFlavor={selectedFlavor}
                            onSelectWeight={handleSelectWeight}
                            onSelectFlavor={handleSelectFlavor}
                        />

                        <div className="calendarSection">
                            <ProductQuantity
                                qtd={qtd}
                                onAdd={() => handleQtd("add")}
                                onSubtract={() => handleQtd("subtract")}
                            />
                            <Schedule
                                date={deliveryDate}
                                setDate={setDeliveryDate}
                            />
                        </div>

                        <div className="submitSection">
                            {isInCart ? (
                                <Link
                                    prefetch
                                    href="/cart"
                                    className="goToCartButton"
                                    onClick={() => setProduct(null)}
                                >
                                    Ir no carrinho
                                </Link>
                            ) : (
                                <button
                                    type="button"
                                    onClick={handleAddClick}
                                    className="addToCartButton"
                                >
                                    Add ao carrinho
                                </button>
                            )}

                            <button type="button" onClick={handleOrder}>
                                Encomendar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
