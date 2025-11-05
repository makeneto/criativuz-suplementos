export default function ProductHeader({
    name,
    price,
    discountPrice,
}: {
    name: string
    price: string
    discountPrice?: string
}) {
    return (
        <header>
            <h2>{name}</h2>
            {discountPrice ? (
                <div>
                    <p>{discountPrice}</p>
                    <span>{price}</span>
                </div>
            ) : (
                <p>{price}</p>
            )}
        </header>
    )
}
