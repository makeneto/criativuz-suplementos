"use client"

import Link from "next/link"
import { ChevronDown, ChevronRight } from "lucide-react"
import { Product } from "@/interfaces/interfaces"
import { motion } from "framer-motion"

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
    const isMainOpen = openCategory === "mais"

    return (
        <li className="nav_bar__category-item">
            <button
                className="nav_bar__categories-btn"
                onClick={() => setOpenCategory(isMainOpen ? null : "mais")}
            >
                Mais <ChevronDown size={16} />
            </button>

            {/* Animação do dropdown principal */}
            <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{
                    height: isMainOpen ? "auto" : 0,
                    opacity: isMainOpen ? 1 : 0,
                }}
                transition={{ duration: 0.2 }}
                style={{ overflow: "hidden" }}
            >
                <ul className="nav_bar__products-list">
                    {categories.map((cat) => {
                        const isSubOpen = openExtraCategory === cat

                        return (
                            <li
                                key={cat}
                                className="nav_bar__extra-category-item"
                            >
                                <button
                                    className="nav_bar__categories-btn"
                                    onClick={() =>
                                        setOpenExtraCategory(
                                            isSubOpen ? null : cat
                                        )
                                    }
                                >
                                    {formatCategory(cat)}{" "}
                                    <ChevronRight size={14} />
                                </button>

                                {/* Subcategoria animada */}
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{
                                        height: isSubOpen ? "auto" : 0,
                                        opacity: isSubOpen ? 1 : 0,
                                    }}
                                    transition={{ duration: 0.2 }}
                                    style={{ overflow: "hidden" }}
                                >
                                    <ul className="nav_bar__products-list nav_bar__products-list--right">
                                        {getProductsByCategory(cat).map(
                                            (prod) => (
                                                <li key={prod.id}>
                                                    <Link
                                                        href={`/products/${prod.id}`}
                                                    >
                                                        {prod.name}
                                                    </Link>
                                                </li>
                                            )
                                        )}
                                    </ul>
                                </motion.div>
                            </li>
                        )
                    })}
                </ul>
            </motion.div>
        </li>
    )
}
