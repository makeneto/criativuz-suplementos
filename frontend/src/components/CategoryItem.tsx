"use client"

import Link from "next/link"
import { ChevronDown } from "lucide-react"
import { Product } from "@/interfaces/interfaces"

interface Props {
    category: string
    products: Product[]
    isOpen: boolean
    onToggle: () => void
    formatCategory: (cat: string) => string
}

export default function CategoryItem({
    category,
    products,
    isOpen,
    onToggle,
    formatCategory,
}: Props) {
    return (
        <li className="nav_bar__category-item">
            <button className="nav_bar__categories-btn" onClick={onToggle}>
                {formatCategory(category)} <ChevronDown size={16} />
            </button>

            {isOpen && (
                <ul className="nav_bar__products-list">
                    {products.map((prod) => (
                        <li key={prod.id}>
                            <Link href={`/produto/${prod.id}`}>
                                {prod.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </li>
    )
}
