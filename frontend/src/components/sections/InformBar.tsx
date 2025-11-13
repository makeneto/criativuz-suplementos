import { MapPinHouse, PhoneOutgoing, TruckElectric } from "lucide-react"
import NextLink from "next/link"

export default function InformBar() {
    return (
        <div className="nav_inform">
            <div>
                <PhoneOutgoing />
                <NextLink prefetch href="tel:244923801395">
                    <p>923801395</p>
                </NextLink>
            </div>

            <div>
                <TruckElectric />
                <p>Entrega grátis para 90% de Luanda</p>
            </div>

            <div>
                <MapPinHouse />
                <NextLink prefetch href="/">
                    <p>Localização</p>
                </NextLink>
            </div>
        </div>
    )
}
