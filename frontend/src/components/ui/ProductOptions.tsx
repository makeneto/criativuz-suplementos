import { Activity } from "react"

interface ProductOptionsProps {
    isProductPage?: boolean
    weights: string[]
    flavors?: string[]
    selectedWeight: string
    selectedFlavor: string
    onSelectWeight: (w: string, i: number) => void
    onSelectFlavor: (f: string) => void
}

export default function ProductOptions({
    isProductPage,
    weights,
    flavors,
    selectedWeight,
    selectedFlavor,
    onSelectWeight,
    onSelectFlavor,
}: ProductOptionsProps) {
    return (
        <section>
            <ul className="modalProduct__container--content--list">
                <li style={{ fontSize: isProductPage ? "1.1rem" : "" }}>
                    Peso
                </li>
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

            <Activity
                mode={flavors && flavors.length > 0 ? "visible" : "hidden"}
            >
                <ul className="modalProduct__container--content--list">
                    <li style={{ fontSize: isProductPage ? "1.1rem" : "" }}>
                        Sabor
                    </li>
                    {flavors?.map((f, index) => (
                        <li
                            key={index}
                            onClick={() => onSelectFlavor(f)}
                            className={selectedFlavor === f ? "active" : ""}
                        >
                            {f}
                        </li>
                    ))}
                </ul>
            </Activity>
        </section>
    )
}
