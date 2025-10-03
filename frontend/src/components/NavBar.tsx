"use client"
import CategoriesMenu from "./CategoriesMenu"
import InformBar from "./InformBar"
import UserActions from "./UserActions"
import NavLogo from "./NavLogo"

export default function NavBar() {
    return (
        <section className="nav">
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
