import { formatCurrency } from "@/utils/formatCurrency"

interface TextPrice {
    product: any
}

export default function TextPrice({ product }: TextPrice) {
    const { discountPrice, price } = product

    return (
        <h2 className="productPrice">
            {price.length > 1 && <p className="lightTag">A partir de</p>}

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
        </h2>
    )
}
