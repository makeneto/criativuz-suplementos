import { useMemo } from "react"

export function useQueryFilter(allProducts: any[], query: string) {
    return useMemo(() => {
        if (!query) return allProducts
        const searchGroups = query
            .split(",")
            .map((g) => g.trim())
            .filter(Boolean)
        return allProducts.filter((product) => {
            const name = product.name.toLowerCase()
            const category = product.category?.toLowerCase() || ""
            const brand = product.brand?.toLowerCase() || ""
            return searchGroups.some((group) => {
                const terms = group
                    .split(/\s+/)
                    .filter(
                        (t) =>
                            t.length > 1 &&
                            !["de", "da", "do", "e", "para", "com"].includes(t)
                    )
                return terms.every(
                    (term) =>
                        name.includes(term) ||
                        category.includes(term) ||
                        brand.includes(term)
                )
            })
        })
    }, [allProducts, query])
}
