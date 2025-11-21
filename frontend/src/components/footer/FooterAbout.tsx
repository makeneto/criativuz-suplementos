import Link from "next/link"
import FooterSocials from "./FooterSocials"

export default function FooterAbout() {
    return (
        <div className="footer__about">
            <Link prefetch href="/">
                <img
                    src="/icons/criativuz-logo.png"
                    alt="Criativuz Logo"
                    className="footer__logo"
                />
            </Link>
            <p className="footer__description-text">
                Quem cresce natural é planta. Aqui, você encontra suplementos
                testados, aprovados e escolhidos para quem leva o treino a
                sério.
            </p>
            <FooterSocials />
        </div>
    )
}
