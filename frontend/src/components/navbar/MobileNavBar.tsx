import { ShoppingBag, TextAlignJustify, Search, X } from "lucide-react"
import { useState, useEffect } from "react"
import Link from "next/link"
import NavLogo from "./NavLogo"
import { RootState } from "@/redux/store"
import { useAppSelector } from "@/redux/hooks"
import { Badge } from "../ui/badge"
import { useMobileSearch } from "@/hooks/search/useMobileSearch"
import { MobileSearch } from "../search/MobileSearch"
import { useMenuDropdown } from "@/hooks/navBar/useMenuDropdown"
import { MobileMenuDropdown } from "../mobile-menu/MobileMenuDropdown"

export default function MobileNavBar() {
    const [hasShadow, setHasShadow] = useState(false)
    const cartItems = useAppSelector((state: RootState) => state.cart.items)
    const { length: cartLength } = cartItems

    const {
        isSearchOpen,
        searchRef,
        inputRef,
        searchTerm,
        setSearchTerm,
        filteredProducts,
        showDropdown,
        setShowDropdown,
        openSearch,
        closeSearch,
        executeSearch,
        handleKeyDown,
    } = useMobileSearch()

    const {
        isOpen: isMenuOpen,
        ref: menuRef,
        toggle: toggleMenu,
    } = useMenuDropdown()

    useEffect(() => {
        const handleScroll = () => setHasShadow(window.scrollY >= 10)
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <nav
            className={`nav__bar nav__bar--mobile nav fixed top-0 w-full z-50 bg-white transition-shadow duration-200 ${
                hasShadow ? "shadow-md" : ""
            }`}
        >
            {isSearchOpen ? (
                <MobileSearch
                    searchRef={searchRef}
                    inputRef={inputRef}
                    searchTerm={searchTerm}
                    filteredProducts={filteredProducts}
                    showDropdown={showDropdown}
                    setSearchTerm={setSearchTerm}
                    setShowDropdown={setShowDropdown}
                    handleKeyDown={handleKeyDown}
                    executeSearch={executeSearch}
                    closeSearch={closeSearch}
                />
            ) : (
                <>
                    <div
                        className="relative flex gap-4 justify-between"
                        ref={menuRef}
                    >
                        {isMenuOpen ? (
                            <X />
                        ) : (
                            <TextAlignJustify
                                className="w-6 h-6 cursor-pointer"
                                onClick={toggleMenu}
                            />
                        )}

                        {isMenuOpen && (
                            <MobileMenuDropdown
                                toggleMenu={toggleMenu}
                                dropdownRef={menuRef}
                            />
                        )}
                        <span className="borderSeparator opacity-0"></span>
                        <ShoppingBag className="w-2 h-2 opacity-0" />
                    </div>

                    <NavLogo />

                    <div className="flex gap-4 justify-between">
                        <Search
                            className="w-5 h-5 cursor-pointer"
                            onClick={openSearch}
                        />
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
                </>
            )}
        </nav>
    )
}
