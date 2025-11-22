"use client"

import { ChevronDown } from "lucide-react"
import { Product } from "@/interfaces/interfaces"
import { useRef } from "react"
import { useClickOutside } from "@/hooks/navBar/useClickOutside"
import { CategoryDropdownList } from "./CategoryDropdownList"
import { useMediaQuery } from "react-responsive"

interface Props {
    category: string
    products: Product[]
    isOpen: boolean
    onToggle: () => void
}

export default function CategoryItem({
    category,
    products,
    isOpen,
    onToggle,
}: Props) {
    const containerRef = useRef<HTMLLIElement>(null)
    useClickOutside(containerRef, () => isOpen && onToggle())

    const isDesktopBetween = useMediaQuery({ minWidth: 1024, maxWidth: 1280 })

    return (
        <li className="nav_bar__category-item" ref={containerRef}>
            <button
                className="nav_bar__categories-btn"
                onClick={onToggle}
                aria-expanded={isOpen}
                aria-controls={`category-${category}`}
            >
                {category === "Ganho de massa" && isDesktopBetween
                    ? "Massa"
                    : category}
                <ChevronDown />
            </button>

            <CategoryDropdownList
                products={products}
                isOpen={isOpen}
                onToggle={onToggle}
            />
        </li>
    )
}
