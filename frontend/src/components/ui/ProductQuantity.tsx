interface ProductQuantityProps {
    qtd: number
    onAdd: () => void
    onSubtract: () => void
    isSmall?: boolean
}

export default function ProductQuantity({
    qtd,
    onAdd,
    onSubtract,
    isSmall = false,
}: ProductQuantityProps) {
    return (
        <div className={!isSmall ? "qtdControl" : "qtdSmallControl"}>
            <button type="button" disabled={qtd === 1} onClick={onSubtract}>
                -
            </button>
            <p>{qtd}</p>
            <button type="button" onClick={onAdd}>
                +
            </button>
        </div>
    )
}
