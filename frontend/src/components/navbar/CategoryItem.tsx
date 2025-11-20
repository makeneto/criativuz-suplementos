"use client"

import Link from "next/link"
import { ChevronDown } from "lucide-react"
import { Product } from "@/interfaces/interfaces"
import { motion } from "framer-motion"
import { useEffect, useRef } from "react"

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
    const containerRef = useRef<HTMLLIElement>(null)

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target as Node)
            ) {
                if (isOpen) {
                    onToggle()
                }
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [isOpen, onToggle])

    return (
        <li className="nav_bar__category-item" ref={containerRef}>
            <button className="nav_bar__categories-btn" onClick={onToggle}>
                {formatCategory(category)}
                <ChevronDown />
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
                            <Link
                                href={`/products/${prod.id}`}
                                onClick={() => onToggle()}
                            >
                                {prod.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </motion.div>
        </li>
    )
}
