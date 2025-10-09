"use client"

import { useCarousel } from "@/hooks/useCarousel"
import HeroSlide from "./HeroSlide"
import HeroIndicators from "./ui/HeroIndicators"

interface Slide {
    imageUrl: string
    title: string
    subtitle?: string
    buttonText?: string
    buttonHref?: string
}

interface HeroCarouselProps {
    slides: Slide[]
    interval?: number
}

export default function HeroCarousel({
    slides,
    interval = 5000,
}: HeroCarouselProps) {
    const { current, next, prev, goTo } = useCarousel(slides.length, interval)

    if (slides.length === 0) return null

    return (
        <div className="heroCarousel">
            <div
                className="heroCarousel__slides"
                style={{ transform: `translateX(-${current * 100}%)` }}
            >
                {slides.map((slide, idx) => (
                    <HeroSlide key={idx} {...slide} />
                ))}
            </div>

            <button
                onClick={prev}
                className="heroCarousel__nav heroCarousel__nav--prev"
                aria-label="Anterior"
            >
                ‹
            </button>

            <button
                onClick={next}
                className="heroCarousel__nav heroCarousel__nav--next"
                aria-label="Próximo"
            >
                ›
            </button>

            <HeroIndicators
                slidesCount={slides.length}
                current={current}
                onSelect={goTo}
            />
        </div>
    )
}
