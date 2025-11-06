"use client"
import { Activity, useState } from "react"
import { formatCurrency } from "@/utils/formatCurrency"
import { Heart, Info, Store } from "lucide-react"
import ProductModal from "../product/ProductModal"
import Link from "next/link"
import TextPrice from "./TextPrice"

interface ProductCartProps {
    products: any
    isThree?: boolean
}

export default function ProductCard({
    products,
    isThree = false,
}: ProductCartProps) {
    const [selectedProduct, setSelectedProduct] = useState<any>(null)
    const [modalConfig, setModalConfig] = useState<any>(null)

    function handleShowProductModal() {
        setSelectedProduct(null)
    }

    return (
        <>
            <ul
                className={"sectionGrid__list"}
                style={{
                    gridTemplateColumns: `repeat(${isThree ? 3 : 4}, 1fr)`,
                }}
            >
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

                        <TextPrice product={p} isThree={isThree} />
                    </li>
                ))}
            </ul>

            <Activity
                mode={selectedProduct && modalConfig ? "visible" : "hidden"}
            >
                {selectedProduct && modalConfig && (
                    <ProductModal
                        product={selectedProduct}
                        setProduct={setSelectedProduct}
                        buttonLabel={modalConfig.buttonLabel}
                        onSubmit={modalConfig.onSubmit}
                    />
                )}
            </Activity>
        </>
    )
}
