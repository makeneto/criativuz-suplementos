import { formatCurrency } from "@/utils/formatCurrency"
import { Activity } from "react"

interface TextPrice {
    product: any
    isThree: boolean
}

export default function TextPrice({ product }: TextPrice) {
    const { discountPrice, price } = product

    return (
        <div className="productPrice">
            <Activity mode={price.length > 1 ? "visible" : "hidden"}>
                <p className="lightTag">A partir de</p>
            </Activity>

            <span
                style={{
                    color:
                        discountPrice[0] > 0 || discountPrice > 0
                            ? "#c20303dd"
                            : "",
                }}
            >
                {" "}
                {discountPrice[0] > 0
                    ? formatCurrency(discountPrice[0] || discountPrice)
                    : formatCurrency(price[0] || price)}
            </span>
        </div>
    )
}
