"use client"

import useProducts from "@/hooks/useProducts"
import { Facebook, Instagram, Mail } from "lucide-react"
import Link from "next/link"

export default function Footer() {
    const { data, isPending } = useProducts()
    const now = new Date()
    const currentYear = now.getFullYear()

    const brands = data?.brands || []

    return (
        <footer className="footer">
            <section className="footer__content">
                <div className="footer__about">
                    <Link prefetch href="/">
                        <img
                            src="/icons/criativuz-logo.png"
                            alt="Criativuz Logo"
                            className="footer__logo"
                        />
                    </Link>

                    <div className="footer__description">
                        <p className="footer__description-text">
                            Quem cresce natural é planta. Aqui, você encontra
                            suplementos testados, aprovados e escolhidos para
                            quem leva o treino a sério.
                        </p>

                        <div className="footer__socials">
                            <Link href="https://mailto:">
                                <Mail size={30} />
                            </Link>
                            <Link href="https://www.instagram.com/criativuz_suplementos">
                                <Instagram size={27} />
                            </Link>
                            <Link href="https://www.facebook.com/profile.php?id=100092004847808">
                                <Facebook size={27} />
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="footer__links">
                    <div className="footer__column">
                        <h2 className="footer__title">Sobre nós</h2>
                        <ul className="footer__list">
                            <Link prefetch href="/#about">
                                Quem Somos
                            </Link>
                            <Link prefetch href="/#bestseller">
                                Mais Vendidos
                            </Link>
                            <Link href="tel:244923801395" target="_blank">
                                Contacto
                            </Link>
                        </ul>
                    </div>

                    <div className="footer__column">
                        <h2 className="footer__title">Marcas</h2>
                        <ul className="footer__list">
                            {isPending ? (
                                <li>Carregando marcas...</li>
                            ) : (
                                brands.map((brand: any) => (
                                    <Link
                                        href={`/search?query=${encodeURIComponent(
                                            brand.name
                                        )}`}
                                        key={brand.name}
                                    >
                                        {brand.name}
                                    </Link>
                                ))
                            )}
                        </ul>
                    </div>

                    <div className="footer__column">
                        <h2 className="footer__title">Produtos</h2>
                        <ul className="footer__list">
                            <Link
                                href={`/search?query=${encodeURIComponent(
                                    "Proteína, Ganho de Massa"
                                )}`}
                            >
                                Proteínas e Ganhos Musculares
                            </Link>
                            <Link
                                href={`/search?query=${encodeURIComponent(
                                    "Creatina, Glutamina"
                                )}`}
                            >
                                Creatina e Aminoácidos
                            </Link>
                            <Link
                                href={`/search?query=${encodeURIComponent(
                                    "Queima gordura"
                                )}`}
                            >
                                Emagrecimento e Termogênicos
                            </Link>
                            <Link
                                href={`/search?query=${encodeURIComponent(
                                    "Suporte à Saúde"
                                )}`}
                            >
                                Suporte à Saúde
                            </Link>
                        </ul>
                    </div>

                    <div className="footer__column">
                        <h2 className="footer__title">Categorias</h2>
                        <ul className="footer__list">
                            <Link
                                href={`/search?query=${encodeURIComponent(
                                    "Proteína"
                                )}`}
                            >
                                Proteínas
                            </Link>
                            <Link
                                href={`/search?query=${encodeURIComponent(
                                    "Creatina"
                                )}`}
                            >
                                Creatina
                            </Link>
                            <Link
                                href={`/search?query=${encodeURIComponent(
                                    "Pré-treino"
                                )}`}
                            >
                                Pré-Treinos
                            </Link>
                            <Link
                                href={`/search?query=${encodeURIComponent(
                                    "Ganho de Massa"
                                )}`}
                            >
                                Ganhos Musculares
                            </Link>
                            <Link
                                href={`/search?query=${encodeURIComponent(
                                    "Testosterona"
                                )}`}
                            >
                                Testosterona
                            </Link>
                            <Link
                                href={`/search?query=${encodeURIComponent(
                                    "Creatina, Glutamina"
                                )}`}
                            >
                                Aminoácidos
                            </Link>
                            <Link
                                href={`/search?query=${encodeURIComponent(
                                    "Queima gordura"
                                )}`}
                            >
                                Emagrecedores
                            </Link>
                        </ul>
                    </div>
                </div>
            </section>

            <p>
                © {currentYear} Criativuz Suplementos. Todos os direitos
                reservados.
            </p>
        </footer>
    )
}
