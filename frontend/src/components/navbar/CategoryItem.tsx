"use client"

import Link from "next/link"
import { ChevronDown } from "lucide-react"
import { Product } from "@/interfaces/interfaces"
import { motion } from "framer-motion"

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
                {formatCategory(category)}
                <ChevronDown size={16} />
            </button>

            <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{
                    height: isOpen ? "auto" : 0,
                    opacity: isOpen ? 1 : 0,
                }}
                transition={{ duration: 0.2 }}
                style={{ overflow: "hidden" }}
            >
                <ul className="nav_bar__products-list">
                    {products.map((prod) => (
                        <li key={prod.id}>
                            <Link href={`/products/${prod.id}`}>
                                {prod.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </motion.div>
        </li>
    )
}
