interface Props {
    product: any
    formattedPrice: string
    formattedDiscountPrice?: string | null
}

export default function ModalInfo({
    product,
    formattedPrice,
    formattedDiscountPrice,
}: Props) {
    return (
        <header>
            <div>
                <h2>{product.name}</h2>
                {formattedDiscountPrice ? (
                    <div className="currentPrice">
                        <p>{formattedDiscountPrice}</p>
                        <span>{formattedPrice}</span>
                    </div>
                ) : (
                    <p>{formattedPrice}</p>
                )}
            </div>

            {product.description?.synopsis && (
                <p className="modalProduct--description">
                    {product.description?.synopsis}
                </p>
            )}
        </header>
    )
}
