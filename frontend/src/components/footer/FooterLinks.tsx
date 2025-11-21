import FooterColumn from "./FooterColumn"

interface FooterLinksProps {
    columns: { title: string; links: { label: string; href: string }[] }[]
}

export default function FooterLinks({ columns }: FooterLinksProps) {
    return (
        <div className="footer__links">
            {columns.map((col) => (
                <FooterColumn
                    key={col.title}
                    title={col.title}
                    links={col.links}
                />
            ))}
        </div>
    )
}
