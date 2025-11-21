import { useMemo } from "react"

export function useDerivedOptions(filteredByQuery: any[]) {
    const flavorOptions = useMemo(
        () => [
            "Todos",
            ...Array.from(
                new Set(
                    filteredByQuery
                        .flatMap((p) => p.flavors || [])
                        .filter(Boolean)
                )
            ),
        ],
        [filteredByQuery]
    )

    const allBrands = useMemo(
        () => [
            ...Array.from(
                new Set(filteredByQuery.map((p) => p.brand).filter(Boolean))
            ).sort(),
        ],
        [filteredByQuery]
    )

    return { flavorOptions, allBrands }
}
