interface ProductOptionsProps {
    weights: string[]
    flavours?: string[]
    selectedWeight: string
    selectedFlavour: string
    onSelectWeight: (w: string, i: number) => void
    onSelectFlavour: (f: string) => void
}

export default function ProductOptions({
    weights,
    flavours,
    selectedWeight,
    selectedFlavour,
    onSelectWeight,
    onSelectFlavour,
}: ProductOptionsProps) {
    return (
        <section>
            <ul className="modalProduct__container--content--list">
                <li>Peso</li>
                {weights.map((w, index) => (
                    <li
                        key={index}
                        onClick={() => onSelectWeight(w, index)}
                        className={selectedWeight === w ? "active" : ""}
                    >
                        {w}
                    </li>
                ))}
            </ul>

            {flavours && flavours.length > 0 && (
                <ul className="modalProduct__container--content--list">
                    <li>Sabor</li>
                    {flavours.map((f, index) => (
                        <li
                            key={index}
                            onClick={() => onSelectFlavour(f)}
                            className={selectedFlavour === f ? "active" : ""}
                        >
                            {f}
                        </li>
                    ))}
                </ul>
            )}
        </section>
    )
}
