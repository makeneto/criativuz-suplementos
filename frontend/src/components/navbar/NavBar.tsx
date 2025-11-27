"use client"

import { useMediaQuery } from "react-responsive"
import DesktopNavBar from "./DesktopNavBar"
import MobileNavBar from "./MobileNavBar"

export default function NavBar() {
    const isMobile = useMediaQuery({ maxWidth: 630 })

    return !isMobile ? <DesktopNavBar /> : <MobileNavBar />
}
