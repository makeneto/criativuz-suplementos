import React from "react"
import SearchBar from "./SearchBar"
import { Headset, Heart, ShoppingCart } from "lucide-react"

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
            <p>
                <ShoppingCart />
                Carrinho
            </p>
        </aside>
    )
}
