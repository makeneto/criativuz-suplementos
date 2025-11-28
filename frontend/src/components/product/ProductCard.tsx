"use client"
import { useState } from "react"
import { Heart, HeartOff, Info, Store } from "lucide-react"
import ProductModal from "./ProductModal"
import Link from "next/link"
import TextPrice from "../ui/TextPrice"
import { useID } from "@/hooks/product/useID"
import useFavoriteHelpers from "@/hooks/favorite/useFavoriteHelpers"
import { useMediaQuery } from "react-responsive"

interface ProductCartProps {
    products: any
    isThree?: boolean
}

export default function ProductCard({
    products,
    isThree = false,
}: ProductCartProps) {
    const randomId = useID()
    const [selectedProduct, setSelectedProduct] = useState<any>(null)
    const [modalConfig, setModalConfig] = useState<any>(null)
    const { addFavorite, isFavoriteFor } = useFavoriteHelpers()

    const isDesktopBetween = useMediaQuery({ minWidth: 1024, maxWidth: 1280 })
    const isMobile = useMediaQuery({ maxWidth: 639 })

    const columns = isDesktopBetween
        ? 3
        : isMobile
        ? isThree
            ? 2
            : 2
        : isThree
        ? 3
        : 4

    const displayProducts = Array.isArray(products)
        ? isMobile
            ? isThree
                ? products
                : products.slice(0, 8)
            : isDesktopBetween
            ? products.slice(0, 6)
            : products
        : []

    function handleShowProductModal() {
        setSelectedProduct(null)
    }

    return (
        <>
            <ul
                className={"sectionGrid__list"}
                style={{
                    gridTemplateColumns: `repeat(${columns}, 1fr)`,
                }}
            >
                {displayProducts.map((p: any) => {
                    const isFavorite = isFavoriteFor(p)

                    return (
                        <li key={`${p.id}-${randomId}`}>
                            <div className="sectionGrid__list--view">
                                <Link href={`/products/${p.id}`}>
                                    <img src={p.postImages[0]} alt={p.name} />
                                </Link>
                                <div className="sectionGrid__list--view--controls">
                                    <div
                                        className="productControl deactivated"
                                        onClick={() => {
                                            setSelectedProduct(p)
                                            setModalConfig({
                                                buttonLabel: "Add ao carrinho",
                                                onSubmit:
                                                    handleShowProductModal,
                                            })
                                        }}
                                    >
                                        <Store className="cursor-pointer" />
                                    </div>

                                    <div
                                        className={`
                                            productControl
                                            ${
                                                isFavorite
                                                    ? "activated"
                                                    : "deactivated"
                                            }
                                        `}
                                        onClick={() => addFavorite(p)}
                                        role="button"
                                        aria-pressed={isFavorite}
                                    >
                                        {isFavorite ? <HeartOff /> : <Heart />}
                                    </div>

                                    <div className="productControl deactivated">
                                        <Link href={`/products/${p.id}`}>
                                            <Info />
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <Link
                                href={`/products/${p.id}`}
                                key={p.id}
                                className="productName"
                            >
                                {p.name}
                            </Link>

                            <TextPrice product={p} className="mt-1" />
                        </li>
                    )
                })}
            </ul>

            {selectedProduct && modalConfig && (
                <ProductModal
                    product={selectedProduct}
                    setProduct={setSelectedProduct}
                    buttonLabel={modalConfig.buttonLabel}
                    onSubmit={modalConfig.onSubmit}
                />
            )}
        </>
    )
}
