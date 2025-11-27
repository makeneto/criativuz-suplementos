"use client"

import { useCategories } from "@/hooks/search/useCategories"
import CategoryItem from "./CategoryItem"
import { useMediaQuery } from "react-responsive"

export default function CategoriesMenu() {
    const isDesktopBetween = useMediaQuery({ minWidth: 1024, maxWidth: 1280 })

    const {
        dropdownRef,
        openCategory,
        setOpenCategory,
        getProductsByCategory,
        mainCategories,
    } = useCategories()

    const categories = isDesktopBetween
        ? mainCategories.slice(0, 3)
        : mainCategories

    return (
        <div className="nav__bar__categories" ref={dropdownRef}>
            <ul className="nav__bar__categories-list">
                {categories.map((cat) => (
                    <CategoryItem
                        key={cat}
                        category={cat}
                        products={getProductsByCategory(cat)}
                        isOpen={openCategory === cat}
                        onToggle={() =>
                            setOpenCategory(openCategory === cat ? null : cat)
                        }
                    />
                ))}
            </ul>
        </div>
    )
}
