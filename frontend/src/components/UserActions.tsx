import Cart from "./CartSheet"
import SearchBar from "./SearchBar"
import { Headset, Heart } from "lucide-react"

export default function UserActions() {
    return (
        <aside className="nav_bar__aside">
            <SearchBar />
            <p>
                <Headset />
                Ajuda
            </p>
            <p>
                <Heart />
                Favoritos
            </p>
            <Cart />
        </aside>
    )
}
