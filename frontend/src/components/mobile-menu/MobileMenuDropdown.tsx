import { RefObject } from "react"
import { FavoriteLink } from "./FavoriteLink"
import { HelpLink } from "./HelpLink"
import { CategoryAccordion } from "./CategoryAccordion"

interface Props {
    toggleMenu: () => void
    dropdownRef: RefObject<HTMLDivElement | null>
}

export function MobileMenuDropdown({ toggleMenu, dropdownRef }: Props) {
    return (
        <div ref={dropdownRef} className="menuDropDown shadow-md overflow-auto">
            <FavoriteLink toggleMenu={toggleMenu} />
            <HelpLink toggleMenu={toggleMenu} />
            <CategoryAccordion toggleMenu={toggleMenu} />
        </div>
    )
}
