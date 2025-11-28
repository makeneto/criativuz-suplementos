import { useMediaQuery } from "react-responsive"

export default function EmptyCart() {
    const isMobile = useMediaQuery({ maxWidth: 640 })
    return (
        <div className="emptyCart">
            <img src="/images/empty-cart.webp" alt="Empty Cart" />

            {isMobile && <p>Seu carrinho está vazio!</p>}
        </div>
    )
}
