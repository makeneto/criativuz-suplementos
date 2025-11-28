import Link from "next/link"
import { Schedule } from "../ui/Schedule"
import { formatCurrency } from "@/utils/formatCurrency"
import { useMediaQuery } from "react-responsive"

export default function CartSummary({
    subtotal,
    deliveryDate,
    setDeliveryDate,
    whatsappUrl,
    currentYear,
}: any) {
    const isMobile = useMediaQuery({ maxWidth: 640 })

    return (
        <section className="cartPage__total">
            {!isMobile && (
                <div>
                    <p>
                        Subtotal: <span>{formatCurrency(subtotal)}</span>
                    </p>
                    <Schedule date={deliveryDate} setDate={setDeliveryDate} />
                </div>
            )}
            <span>
                <Link href={whatsappUrl} type="button" className="orderCart">
                    Encomendar
                </Link>
                <p>© {currentYear} Criativuz Suplementos.</p>
            </span>
        </section>
    )
}
