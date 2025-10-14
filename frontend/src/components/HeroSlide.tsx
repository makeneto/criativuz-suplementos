interface SlideProps {
    imageUrl: string
    title: string
    subtitle?: string
    buttonText?: string
    buttonHref?: string
}

export default function HeroSlide({
    imageUrl,
    title,
    subtitle,
    buttonText,
    buttonHref,
}: SlideProps) {
    return (
        <div className="heroCarousel__slide">
            <img src={imageUrl} alt={title} />
            <div className="heroCarousel__overlay" />
            <div className="heroCarousel__content">
                <h2>{title}</h2>
                {subtitle && <p>{subtitle}</p>}
                {buttonText && buttonHref && (
                    <a href={buttonHref} className="heroCarousel__button">
                        {buttonText}
                    </a>
                )}
            </div>
        </div>
    )
}
