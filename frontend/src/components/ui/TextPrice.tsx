import useTextPrice from "@/hooks/utils/useTextPrice"
import { formatCurrency } from "@/utils/formatCurrency"

interface TextPriceProps {
    product: any
    qtd?: number
    isLight?: boolean
    className?: string
}

export default function TextPrice({
    product,
    qtd,
    isLight = false,
    className,
}: TextPriceProps) {
    const { price, discountPrice } = product

    const { finalPrice, color, fontWeight } = useTextPrice({
        price,
        discountPrice,
        qtd,
        isLight,
    })

    return (
        <h2 className={`productPrice ${className}`}>
            {Array.isArray(price) && price.length > 1 && (
                <p className="lightTag">A partir de</p>
            )}

            <span style={{ color, fontWeight }}>
                {formatCurrency(finalPrice)}
            </span>
        </h2>
    )
}
