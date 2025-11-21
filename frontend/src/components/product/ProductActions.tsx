import { Schedule } from "../ui/Schedule"
import ProductQuantity from "../ui/ProductQuantity"
import { ProductActionsProps } from "@/interfaces/interfaces"

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
                <Schedule date={deliveryDate} setDate={setDeliveryDate} />
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
