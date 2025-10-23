import { Helix } from "ldrs/react"
import "ldrs/react/Helix.css"

type SpinnerProps = {
    size?: string
    color?: string
}

export default function Spinner({
    size = "45",
    color = "#250609",
}: SpinnerProps) {
    return (
        <section
            style={{
                marginTop: "4rem",
                display: "flex",
                justifyContent: "center",
            }}
        >
            <Helix size={size} speed="2.5" color={color} />
        </section>
    )
}
