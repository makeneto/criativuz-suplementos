"use client"
import { useState } from "react"
import { formatCurrency } from "@/utils/formatCurrency"
import {
    Eye,
    Heart,
    Info,
    ShoppingBag,
    ShoppingCart,
    Store,
} from "lucide-react"
import ProductModal from "../ProductModal"
import Link from "next/link"

export default function ProductCard({ products }: any) {
    const [selectedProduct, setSelectedProduct] = useState<any>(null)
    const [modalConfig, setModalConfig] = useState<any>(null)

    function handleShowProductModal() {
        setSelectedProduct(null)
    }

    return (
        <>
            <ul className="sectionGrid__list">
                {products.map((p: any) => (
                    <li>
                        <div className="sectionGrid__list--view">
                            <Link href={`/products/${p.id}`} key={p.id}>
                                <img
                                    src={p.postImages[0]}
                                    alt={`Product Image`}
                                />
                            </Link>
                            <div className="sectionGrid__list--view--controls">
                                <div
                                    onClick={() => {
                                        setSelectedProduct(p)
                                        setModalConfig({
                                            buttonLabel: "Add ao carrinho",
                                            onSubmit: handleShowProductModal,
                                        })
                                    }}
                                >
                                    <Store className="cursor-pointer" />
                                </div>

                                <div>
                                    <Heart />
                                </div>

                                <div>
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
                        <h3
                            style={{
                                color:
                                    p.discountPrice[0] > 0 ||
                                    p.discountPrice > 0
                                        ? "#c20303dd"
                                        : "",
                            }}
                        >
                            {p.discountPrice[0] > 0
                                ? formatCurrency(
                                      p.discountPrice[0] || p.discountPrice
                                  )
                                : formatCurrency(p.price[0] || p.price)}
                        </h3>
                    </li>
                ))}
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
