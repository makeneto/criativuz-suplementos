interface IntroProps {
    category: string
    title: string
    description?: string
}

export default function IntroSection({
    category,
    title,
    description,
}: IntroProps) {
    return (
        <div className="intro">
            <p className="intro__category">{category}</p>
            <h1 className="intro__title">{title}</h1>
            <p className="intro__description">{description}</p>
        </div>
    )
}
