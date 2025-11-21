import { useProductLogic } from "@/hooks/product/useProductLogic"

export function useFavoriteSheetItem(product: any) {
    const { formattedPrice, formattedDiscountPrice } = useProductLogic({
        product,
    })
    const variants = {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: 50, transition: { duration: 0.3 } },
    }

    return { formattedPrice, formattedDiscountPrice, variants }
}
