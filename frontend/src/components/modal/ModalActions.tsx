import ProductQuantity from "../ui/ProductQuantity"
import { Schedule } from "../ui/Schedule"
import Link from "next/link"

interface Props {
    isInCart: boolean
    handleAddClick: () => void
    handleOrder: () => void
    setProduct: (p: any) => void
    deliveryDate: Date | undefined
    setDeliveryDate: (d: Date | undefined) => void
    qtd: number
    onAdd: () => void
    onSubtract: () => void
}

export default function ModalActions({
    isInCart,
    handleAddClick,
    handleOrder,
    setProduct,
    deliveryDate,
    setDeliveryDate,
    qtd,
    onAdd,
    onSubtract,
}: Props) {
    return (
        <>
            <div className="calendarSection">
                <ProductQuantity
                    qtd={qtd}
                    onAdd={onAdd}
                    onSubtract={onSubtract}
                />
                <Schedule date={deliveryDate} setDate={setDeliveryDate} />
            </div>
            <div className="submitSection">
                {isInCart ? (
                    <Link
                        href="/cart"
                        onClick={() => setProduct(null)}
                        className="goToCartButton"
                    >
                        Ir no carrinho
                    </Link>
                ) : (
                    <button
                        onClick={handleAddClick}
                        className="addToCartButton"
                    >
                        Add ao carrinho
                    </button>
                )}
                <button onClick={handleOrder}>Encomendar</button>
            </div>
        </>
    )
}
