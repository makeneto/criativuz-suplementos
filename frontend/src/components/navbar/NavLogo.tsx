import Link from "next/link"

export default function NavLogo() {
    return (
        <Link href="/">
            <img
                src="/icons/criativuz-logo.png"
                alt="Criativuz Logo"
                className="nav_bar--logo"
            />
        </Link>
    )
}
