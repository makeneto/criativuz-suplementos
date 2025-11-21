import Link from "next/link"

interface FooterColumnProps {
    title: string
    links: { label: string; href: string }[]
}

export default function FooterColumn({ title, links }: FooterColumnProps) {
    return (
        <div className="footer__column">
            <h2 className="footer__title">{title}</h2>
            <ul className="footer__list">
                {links.map((link) => (
                    <Link key={link.label} href={link.href}>
                        {link.label}
                    </Link>
                ))}
            </ul>
        </div>
    )
}
