"use client"

import useProducts from "@/hooks/useProducts"
import { Facebook, Instagram } from "lucide-react"
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
                    <Link href="/">
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
                            <Link href="https://www.instagram.com/criativuz_suplementos">
                                <Instagram />
                            </Link>
                            <Link href="https://www.facebook.com/profile.php?id=100092004847808">
                                <Facebook />
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="footer__links">
                    <div className="footer__column">
                        <h2 className="footer__title">Sobre nós</h2>
                        <ul className="footer__list">
                            <li>Quem Somos</li>
                            <li>Mais Vendidos</li>
                            <li>Contacto</li>
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
                                    "Proteina, ganho de massa"
                                )}`}
                            >
                                Proteínas e Ganhos Musculares
                            </Link>
                            <Link
                                href={`/search?query=${encodeURIComponent(
                                    "creatina, glutamina"
                                )}`}
                            >
                                Creatina e Aminoácidos
                            </Link>
                            <Link
                                href={`/search?query=${encodeURIComponent(
                                    "queima gordura"
                                )}`}
                            >
                                Emagrecimento e Termogênicos
                            </Link>
                            <Link
                                href={`/search?query=${encodeURIComponent(
                                    "suporte à saúde"
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
                                    "proteína"
                                )}`}
                            >
                                Proteínas
                            </Link>
                            <Link
                                href={`/search?query=${encodeURIComponent(
                                    "creatina"
                                )}`}
                            >
                                Creatina
                            </Link>
                            <Link
                                href={`/search?query=${encodeURIComponent(
                                    "pré-treino"
                                )}`}
                            >
                                Pré-Treinos
                            </Link>
                            <Link
                                href={`/search?query=${encodeURIComponent(
                                    "ganho de massa"
                                )}`}
                            >
                                Ganhos Musculares
                            </Link>
                            <Link
                                href={`/search?query=${encodeURIComponent(
                                    "testosterona"
                                )}`}
                            >
                                Testosterona
                            </Link>
                            <Link
                                href={`/search?query=${encodeURIComponent(
                                    "creatina, glutamina"
                                )}`}
                            >
                                Aminoácidos
                            </Link>
                            <Link
                                href={`/search?query=${encodeURIComponent(
                                    "queima gordura"
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
