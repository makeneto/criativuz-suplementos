import Link from "next/link"
import React from "react"

export default function NavLogo() {
    return (
        <Link href="/">
            <img
                src="/logo.png"
                alt="Criativuz Logo"
                className="nav_bar--logo"
            />
        </Link>
    )
}
