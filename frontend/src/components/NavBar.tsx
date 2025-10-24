"use client"

import { useEffect, useState } from "react"
import CategoriesMenu from "./CategoriesMenu"
import InformBar from "./InformBar"
import UserActions from "./UserActions"
import NavLogo from "./ui/NavLogo"

export default function NavBar() {
    const [hasShadow, setHasShadow] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setHasShadow(window.scrollY >= 10)
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <section
            className={`nav fixed top-0 left-0 w-full z-50 bg-white transition-shadow duration-3000 ${
                hasShadow ? "shadow-lg" : ""
            }`}
        >
            <InformBar />

            <nav className="nav_bar">
                <div className="nav_bar--firstChild">
                    <NavLogo />
                    <CategoriesMenu />
                </div>

                <UserActions />
            </nav>
        </section>
    )
}
