"use client"

import { useCategories } from "@/hooks/useCategories"
import CategoryItem from "./CategoryItem"
import ExtraCategories from "./ExtraCategories"

export default function CategoriesMenu() {
    const {
        dropdownRef,
        openCategory,
        setOpenCategory,
        openExtraCategory,
        setOpenExtraCategory,
        getProductsByCategory,
        formatCategory,
        mainCategories,
        extraCategories,
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
                        formatCategory={formatCategory}
                    />
                ))}

                {extraCategories.length > 0 && (
                    <ExtraCategories
                        categories={extraCategories}
                        openCategory={openCategory}
                        openExtraCategory={openExtraCategory}
                        setOpenCategory={setOpenCategory}
                        setOpenExtraCategory={setOpenExtraCategory}
                        getProductsByCategory={getProductsByCategory}
                        formatCategory={formatCategory}
                    />
                )}
            </ul>
        </div>
    )
}
