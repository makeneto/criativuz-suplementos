interface HeroIndicatorsProps {
    slidesCount: number
    current: number
    onSelect: (index: number) => void
}

export default function HeroIndicators({
    slidesCount,
    current,
    onSelect,
}: HeroIndicatorsProps) {
    return (
        <div className="heroCarousel__indicators">
            {Array.from({ length: slidesCount }).map((_, idx) => (
                <button
                    key={idx}
                    className={`heroCarousel__indicator ${
                        idx === current ? "active" : ""
                    }`}
                    onClick={() => onSelect(idx)}
                />
            ))}
        </div>
    )
}
