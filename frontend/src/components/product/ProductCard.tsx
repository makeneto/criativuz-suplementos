"use client"
import { useState } from "react"
import { Heart, HeartOff, Info, Store, XCircle } from "lucide-react"
import ProductModal from "./ProductModal"
import Link from "next/link"
import TextPrice from "../ui/TextPrice"
import { useID } from "@/hooks/product/useID"
import useFavoriteHelpers from "@/hooks/favorite/useFavoriteHelpers"
import { useMediaQuery } from "react-responsive"
import { ProductLink } from "./ProductLink"

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
    const isMobile = useMediaQuery({ maxWidth: 768 })

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
                        <li
                            key={`${p.id}-${randomId}`}
                            className={p.inStock ? "inStock" : "outOfStock"}
                        >
                            <div className="sectionGrid__list--view">
                                <ProductLink
                                    inStock={p.inStock}
                                    href={`/products/${p.id}`}
                                >
                                    <img src={p.postImages[0]} alt={p.name} />
                                </ProductLink>
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
                                        <ProductLink
                                            inStock={p.inStock}
                                            href={`/products/${p.id}`}
                                        >
                                            <Info />
                                        </ProductLink>
                                    </div>
                                </div>
                            </div>

                            <ProductLink
                                inStock={p.inStock}
                                href={`/products/${p.id}`}
                                className="productName"
                            >
                                {p.name}
                            </ProductLink>

                            {!p.inStock ? (
                                <p className="outOfStock__badge">
                                    <XCircle />
                                    Fora de Stock
                                </p>
                            ) : (
                                <TextPrice product={p} className="mt-1" />
                            )}
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
