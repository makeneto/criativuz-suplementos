import { useEffect, useMemo } from "react"

export function usePriceFilter(
    prePriceFilteredProducts: any[],
    selectedMaxPrice: number,
    setCurrentPrice: (v: number) => void,
    setSelectedMaxPrice: (v: number) => void
) {
    const maxPrice = useMemo(() => {
        const prices = prePriceFilteredProducts
            .flatMap((p) => (Array.isArray(p.price) ? p.price : [p.price]))
            .filter(Number.isFinite)
        return prices.length ? Math.max(...prices) : 0
    }, [prePriceFilteredProducts])

    useEffect(() => {
        setCurrentPrice(maxPrice)
        setSelectedMaxPrice(maxPrice)
    }, [maxPrice, setCurrentPrice, setSelectedMaxPrice])

    const finalProducts = useMemo(() => {
        return prePriceFilteredProducts.filter((p) =>
            (Array.isArray(p.price) ? p.price : [p.price]).some(
                (price: number) => price <= selectedMaxPrice
            )
        )
    }, [prePriceFilteredProducts, selectedMaxPrice])

    return { maxPrice, finalProducts }
}
