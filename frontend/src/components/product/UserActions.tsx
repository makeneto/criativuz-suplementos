import SearchBar from "../navbar/SearchBar"
import { Headset, Heart } from "lucide-react"
import CartSheet from "../cart/CartSheet"

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
            <CartSheet />
        </aside>
    )
}
