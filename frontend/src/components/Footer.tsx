import useProducts from "@/hooks/useProducts"
import { Facebook, Instagram } from "lucide-react"
import Link from "next/link"

export default async function Footer() {
    const all = await useProducts()
    const brands = all.brands
    const now = new Date()
    const currentYear = now.getFullYear()

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
                            {brands.map((brand: any) => (
                                <li key={brand.name}>{brand.name}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="footer__column">
                        <h2 className="footer__title">Produtos</h2>
                        <ul className="footer__list">
                            <li>Proteínas e Ganhos Musculares</li>
                            <li>Creatina e Aminoácidos</li>
                            <li>Emagrecimento e Termogênicos</li>
                            <li>Suporte à Saúde</li>
                        </ul>
                    </div>

                    <div className="footer__column">
                        <h2 className="footer__title">Categorias</h2>
                        <ul className="footer__list">
                            <li>Proteínas</li>
                            <li>Creatina</li>
                            <li>Pré-Treinos</li>
                            <li>Ganhos Musculares</li>
                            <li>Testosterona</li>
                            <li>Aminoácidos</li>
                            <li>Emagrecedores</li>
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
