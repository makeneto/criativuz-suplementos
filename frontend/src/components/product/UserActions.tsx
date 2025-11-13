import SearchBar from "../navbar/SearchBar"
import { Headset, Heart } from "lucide-react"
import CartSheet from "../cart/CartSheet"
import FavoriteSheet from "../favorite/FavoriteSheet"

export default function UserActions() {
    return (
        <aside className="nav_bar__aside">
            <SearchBar />
            <p>
                <Headset />
                Ajuda
            </p>
            <FavoriteSheet />
            <CartSheet />
        </aside>
    )
}
