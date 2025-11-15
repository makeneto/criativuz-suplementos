import Link from "next/link"

export default function Hero() {
    return (
        <div className="hero">
            <img src="/images/hero.webp" alt="Hero Image" />
            <div className="hero__overlay" />
            <div className="hero__content">
                <h5>
                    Uuuh, <span className="darkTag">Criativuz Suplementos</span>
                </h5>
                <h2>Quem Cresce Natural é Planta!</h2>
                <p>Resultados não vêm só do treino</p>

                <Link href="" className="hero__button">
                    <span>Começar</span>
                </Link>
            </div>
        </div>
    )
}
