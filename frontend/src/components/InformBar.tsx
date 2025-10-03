import { Link, MapPinHouse, PhoneOutgoing, TruckElectric } from "lucide-react"
import React from "react"

export default function InformBar() {
    return (
        <div className="nav_inform">
            <Link href="tel:923801395">
                <PhoneOutgoing />
                923801395
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
    )
}
