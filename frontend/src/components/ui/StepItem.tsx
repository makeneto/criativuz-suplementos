interface StepItemProps {
    num: number
    title: string
    description: string
}

export default function StepItem({ num, title, description }: StepItemProps) {
    return (
        <div className="step">
            <h1 className="step__num">0{num}</h1>
            <h2 className="step__title">{title}</h2>
            <p className="step__description">{description}</p>
        </div>
    )
}
