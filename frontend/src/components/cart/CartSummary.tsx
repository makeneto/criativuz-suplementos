import Link from "next/link"
import { Schedule } from "../ui/Schedule"
import { formatCurrency } from "@/utils/formatCurrency"

export default function CartSummary({
    subtotal,
    deliveryDate,
    setDeliveryDate,
    whatsappUrl,
    currentYear,
}: any) {
    return (
        <section className="cartPage__total">
            <div>
                <p>
                    Subtotal: <span>{formatCurrency(subtotal)}</span>
                </p>
                <Schedule date={deliveryDate} setDate={setDeliveryDate} />
            </div>
            <span>
                <Link href={whatsappUrl} type="button" className="orderCart">
                    Encomendar
                </Link>
                <p>© {currentYear} Criativuz Suplementos.</p>
            </span>
        </section>
    )
}
