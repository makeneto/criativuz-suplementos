interface ProductQuantityProps {
    qtd: number
    onAdd: () => void
    onSubtract: () => void
}

export default function ProductQuantity({
    qtd,
    onAdd,
    onSubtract,
}: ProductQuantityProps) {
    return (
        <span>
            <button type="button" disabled={qtd === 1} onClick={onSubtract}>
                -
            </button>
            <p>{qtd}</p>
            <button type="button" onClick={onAdd}>
                +
            </button>
        </span>
    )
}
