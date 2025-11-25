"use client"

import useFooter from "@/hooks/footer/useFooter"
import FooterAbout from "../footer/FooterAbout"
import FooterLinks from "../footer/FooterLinks"
import Copyright from "../footer/Copyright"

export default function Footer() {
    const { columns } = useFooter()

    return (
        <footer className="footer">
            <section className="footer__content">
                <FooterAbout />
                <FooterLinks columns={columns} />
            </section>

            <Copyright />
        </footer>
    )
}
