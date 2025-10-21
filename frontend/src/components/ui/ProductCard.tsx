"use client"
import { useState } from "react"
import { formatCurrency } from "@/utils/formatCurrency"
import { Eye, Heart, ShoppingBag, ShoppingCart } from "lucide-react"
import ProductModal from "../ProductModal"
import Link from "next/link"

export default function ProductCard({ products }: any) {
    const [selectedProduct, setSelectedProduct] = useState<any>(null)
    const [modalConfig, setModalConfig] = useState<any>(null)

    function handleEncomendar(data: any) {
        console.log("Encomendando produto:", data)
        setSelectedProduct(null)
    }

    function handleAddToCart(data: any) {
        console.log("Adicionando ao carrinho:", data)
        setSelectedProduct(null)
    }

    return (
        <>
            <ul className="sectionGrid__list">
                {products.map((p: any) => (
                    <Link href={`/products/${p.id}`} key={p.id}>
                        <div className="sectionGrid__list--view">
                            <img src={p.postImages[0]} alt={`Product Image`} />
                            <div className="sectionGrid__list--view--controls">
                                <div
                                    onClick={() => {
                                        setSelectedProduct(p)
                                        setModalConfig({
                                            buttonLabel: "Encomendar",
                                            onSubmit: handleEncomendar,
                                        })
                                    }}
                                >
                                    <ShoppingBag className="cursor-pointer" />
                                </div>

                                <div
                                    onClick={() => {
                                        setSelectedProduct(p)
                                        setModalConfig({
                                            buttonLabel: "Add ao carrinho",
                                            onSubmit: handleAddToCart,
                                        })
                                    }}
                                >
                                    <ShoppingCart className="cursor-pointer" />
                                </div>

                                <div>
                                    <Heart />
                                </div>
                            </div>
                        </div>

                        <p>{p.name}</p>
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
                    </Link>
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
