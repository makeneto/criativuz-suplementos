"use client"

import useFooter from "@/hooks/footer/useFooter"
import FooterAbout from "../footer/FooterAbout"
import FooterLinks from "../footer/FooterLinks"

export default function Footer() {
    const { columns, currentYear } = useFooter()

    return (
        <footer className="footer">
            <section className="footer__content">
                <FooterAbout />
                <FooterLinks columns={columns} />
            </section>
            <p>
                © {currentYear} Criativuz Suplementos. Todos os direitos
                reservados.
            </p>
        </footer>
    )
}
