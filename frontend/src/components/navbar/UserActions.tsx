import SearchBar from "../search/SearchBar"
import { Headset, Heart } from "lucide-react"
import CartSheet from "../cart/CartSheet"
import FavoriteSheet from "../favorite/FavoriteSheet"
import HelpSheet from "../help/HelpSheet"

export default function UserActions() {
    return (
        <aside className="nav_bar__aside">
            <SearchBar />
            <HelpSheet />
            <FavoriteSheet />
            <CartSheet />
        </aside>
    )
}
