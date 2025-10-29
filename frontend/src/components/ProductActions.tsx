import { Calendar22 } from "./Calendar22"
import ProductQuantity from "./ui/ProductQuantity"

interface ProductActionsProps {
    qtd: number
    onAdd: () => void
    onSubtract: () => void
    deliveryDate?: Date
    setDeliveryDate: (date: Date | undefined) => void
    onOrder: (e: React.MouseEvent) => void
    onAddToCart: () => void
}

export default function ProductActions({
    qtd,
    onAdd,
    onSubtract,
    deliveryDate,
    setDeliveryDate,
    onOrder,
    onAddToCart,
}: ProductActionsProps) {
    return (
        <div className="productSubmitSection">
            <div className="mb-4">
                <ProductQuantity
                    qtd={qtd}
                    onAdd={onAdd}
                    onSubtract={onSubtract}
                />
                <Calendar22 date={deliveryDate} setDate={setDeliveryDate} />
            </div>

            <div>
                <button type="button" className="order" onClick={onAddToCart}>
                    Add ao Carrinho
                </button>
                <button type="submit" className="cart" onClick={onOrder}>
                    Encomendar
                </button>
            </div>
        </div>
    )
}
