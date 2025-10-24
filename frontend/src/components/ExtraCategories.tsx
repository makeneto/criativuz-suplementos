"use client"

import Link from "next/link"
import { ChevronDown, ChevronRight } from "lucide-react"
import { Product } from "@/interfaces/interfaces"

interface Props {
    categories: string[]
    openCategory: string | null
    openExtraCategory: string | null
    setOpenCategory: (cat: string | null) => void
    setOpenExtraCategory: (cat: string | null) => void
    getProductsByCategory: (cat: string) => Product[]
    formatCategory: (cat: string) => string
}

export default function ExtraCategories({
    categories,
    openCategory,
    openExtraCategory,
    setOpenCategory,
    setOpenExtraCategory,
    getProductsByCategory,
    formatCategory,
}: Props) {
    return (
        <li className="nav_bar__category-item">
            <button
                className="nav_bar__categories-btn"
                onClick={() =>
                    setOpenCategory(openCategory === "mais" ? null : "mais")
                }
            >
                Mais <ChevronDown size={16} />
            </button>

            {openCategory === "mais" && (
                <ul className="nav_bar__products-list">
                    {categories.map((cat) => (
                        <li
                            key={cat}
                            className="nav_bar__extra-category-item"
                            onClick={() => setOpenExtraCategory(cat)}
                        >
                            <button
                                className="nav_bar__categories-btn"
                                onClick={() =>
                                    setOpenExtraCategory(
                                        openExtraCategory === cat ? null : cat
                                    )
                                }
                            >
                                {formatCategory(cat)} <ChevronRight size={14} />
                            </button>

                            {openExtraCategory === cat && (
                                <ul className="nav_bar__products-list nav_bar__products-list--right">
                                    {getProductsByCategory(cat).map((prod) => (
                                        <li key={prod.id}>
                                            <Link href={`/products/${prod.id}`}>
                                                {prod.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </li>
    )
}
