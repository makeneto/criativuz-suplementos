"use client"

import { useCategories } from "@/hooks/search/useCategories"
import CategoryItem from "./CategoryItem"

export default function CategoriesMenu() {
    const {
        dropdownRef,
        openCategory,
        setOpenCategory,
        getProductsByCategory,
        mainCategories,
    } = useCategories()

    return (
        <div className="nav_bar__categories" ref={dropdownRef}>
            <ul className="nav_bar__categories-list">
                {mainCategories.map((cat) => (
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
