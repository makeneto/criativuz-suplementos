interface useTextPriceProps {
    price: number[]
    discountPrice: number[]
    qtd: number | undefined
    isLight: boolean
}

export default function useTextPrice({
    price,
    discountPrice,
    qtd,
    isLight,
}: useTextPriceProps) {
    const basePrice = Array.isArray(price) ? price[0] : price
    const promo = Array.isArray(discountPrice)
        ? discountPrice[0]
        : discountPrice

    const hasPromotion = promo !== null && promo !== undefined && promo > 0

    const unitPrice = hasPromotion ? promo : basePrice
    const finalPrice = qtd ? unitPrice * qtd : unitPrice

    const color = hasPromotion && !isLight ? "#c20303dd" : ""
    const fontWeight = hasPromotion && isLight ? 500 : ""

    return { finalPrice, color, fontWeight }
}
