import useTextPrice from "@/hooks/utils/useTextPrice"
import { formatCurrency } from "@/utils/formatCurrency"
import { useMediaQuery } from "react-responsive"

interface TextPriceProps {
    product: any
    qtd?: number
    isLight?: boolean
    isTable?: boolean
    className?: string
}

export default function TextPrice({
    product,
    qtd,
    isLight = false,
    isTable = false,
    className,
}: TextPriceProps) {
    const { price, discountPrice } = product

    const isMobile = useMediaQuery({ maxWidth: 639 })

    const { finalPrice, color, fontWeight } = useTextPrice({
        price,
        discountPrice,
        qtd,
        isLight,
    })

    return (
        <div
            className={`productPrice ${className} ${
                isTable ? "sm:justify-start" :  "justify-center"
            }`}
        >
            {Array.isArray(price) && price.length > 1 && (
                <span className="lightTag">
                    {!isMobile ? "A partir de" : "De"}
                </span>
            )}

            <p style={{ color, fontWeight }}>{formatCurrency(finalPrice)}</p>
        </div>
    )
}
