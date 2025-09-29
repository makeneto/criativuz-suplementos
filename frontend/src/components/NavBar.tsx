import React from "react"
import Link from "next/link"
import {
    Headset,
    HeartHandshake,
    MapPinHouse,
    PhoneOutgoing,
    Search,
    ShoppingCart,
    TruckElectric,
} from "lucide-react"

export default function NavBar() {
    return (
        <section>
            <div className="hero_inform">
                <Link href="">
                    <PhoneOutgoing />
                    945336003
                </Link>
                <p>
                    <TruckElectric />
                    Entrega grátis para 90% de Luanda
                </p>
                <Link href="">
                    <MapPinHouse />
                    Localização
                </Link>
            </div>

            <nav className="navBar">
                <img src="/logo.png" alt="Criativuz Logo" />

                <aside className="navBar__aside">
                    <div className="navBar__aside--inputContainer">
                        <Search />
                        <input
                            type="text"
                            placeholder="Procurar suplementos, acessórios..."
                        />
                    </div>
                    <p>
                        <Headset />
                        Ajuda
                    </p>
                    <p>
                        <HeartHandshake />
                        Favoritos
                    </p>
                    <p>
                        <ShoppingCart />
                        Carrinho
                    </p>
                </aside>
            </nav>
        </section>
    )
}
