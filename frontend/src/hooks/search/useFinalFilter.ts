import { USER_GOALS } from "@/constants/userGoals"
import { useMemo } from "react"

export function useFinalFilter(
    filteredByQuery: any[],
    selectedGoals: string[],
    selectedBrands: string[],
    selectedCategory: string | null,
    selectedFlavor: string | null
) {
    return useMemo(() => {
        return filteredByQuery
            .filter(
                (p) =>
                    !selectedGoals.length ||
                    selectedGoals
                        .flatMap((goal) => USER_GOALS[goal] || [])
                        .some(
                            (cat) =>
                                p.category?.toLowerCase() === cat.toLowerCase()
                        )
            )
            .filter(
                (p) =>
                    !selectedBrands.length || selectedBrands.includes(p.brand)
            )
            .filter((p) =>
                !selectedCategory || selectedCategory === "Todas"
                    ? true
                    : p.category === selectedCategory
            )
            .filter((p) =>
                !selectedFlavor || selectedFlavor === "Todos"
                    ? true
                    : p.flavors?.includes(selectedFlavor)
            )
    }, [
        filteredByQuery,
        selectedGoals,
        selectedBrands,
        selectedCategory,
        selectedFlavor,
    ])
}
