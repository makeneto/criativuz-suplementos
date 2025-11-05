import Link from "next/link"

export default function HeroSection() {
    return (
        <div className="heroCarousel__slide">
            <img src="/images/heroCarousel1.webp" alt="Hero Image" />
            <div className="heroCarousel__overlay" />
            <div className="heroCarousel__content">
                <h5>
                    Uuuh, <span className="darkTag">Criativuz Suplementos</span>
                </h5>
                <h2>Quem Cresce Natural é Planta!</h2>
                <p>Resultados não vêm só do treino</p>

                <Link href="" className="heroCarousel__button">
                    <span>Começar</span>
                </Link>
            </div>
        </div>
    )
}
