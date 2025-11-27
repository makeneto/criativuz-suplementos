import { Search, ShoppingBag, TextAlignJustify } from "lucide-react"
import NavLogo from "./NavLogo"
import { useEffect, useState } from "react"
import Link from "next/link"
import { RootState } from "@/redux/store"
import { useAppSelector } from "@/redux/hooks"
import { Badge } from "../ui/badge"

export default function MobileNavBar() {
    const [hasShadow, setHasShadow] = useState(false)
    const cartItems = useAppSelector((state: RootState) => state.cart.items)
    const { length: cartLength } = cartItems

    useEffect(() => {
        const handleScroll = () => {
            setHasShadow(window.scrollY >= 10)
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <nav
            className={`nav__bar nav__bar--mobile nav fixed top-0 w-full z-50 bg-white transition-shadow duration-2000 ${
                hasShadow ? "shadow-md" : ""
            }`}
        >
            <div className="flex gap-4 justify-between">
                <TextAlignJustify className="w-6 h-6" />
                <span className="borderSeparator opacity-0"></span>
                <ShoppingBag className="w-2 h-2 opacity-0" />
            </div>

            <NavLogo />

            <div className="flex gap-4 justify-between">
                <Search className="w-5 h-5" />
                <span className="borderSeparator"></span>
                <Link prefetch href="/cart" className="relative">
                    <ShoppingBag className="w-5 h-5" />
                    {cartLength > 0 && (
                        <Badge
                            className="flex justify-between h-4 min-w-4 rounded-full px-1 font-mono tabular-nums bg-white text-red-800 text-center absolute top-[-40%] right-[-30%]"
                            variant="destructive"
                        >
                            {cartLength}
                        </Badge>
                    )}
                </Link>
            </div>
        </nav>
    )
}
