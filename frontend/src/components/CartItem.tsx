import React from "react"
import { useDispatch } from "react-redux"
import { removeFromCart } from "@/redux/slices/cartSlice"
import { Button } from "./ui/button"
import { Trash, TruckElectric } from "lucide-react"
import { formatCurrency } from "@/utils/formatCurrency"

interface CartItemProps {
    id: string
    image: string
    name: string
    flavour: string
    category: string
    price: number
    quantity: number
}

interface ItemsProps {
    item: CartItemProps
}

export default function CartItem({ item }: ItemsProps) {
    const dispatch = useDispatch()

    const { id, image, name, flavour, category, price, quantity } = item

    return (
        <div key={id} className="cartItem">
            <p className="cartItem--category">{category}</p>

            <div className="cartItem__main">
                <img
                    src={image}
                    alt={name}
                    className="w-16 h-16 object-cover"
                />

                <div className="cartItem__content">
                    <h1>{name}</h1>

                    <div className="cartItem__content--details">
                        <p>
                            Sabor: <span>{flavour}</span>
                        </p>
                        <p>
                            Sabor: <span>{flavour}</span>
                        </p>
                    </div>

                    <div className="tag">
                        <TruckElectric />
                        Entrega grátis
                    </div>

                    <div className="operations">
                        <p className="text-sm font-semibold">{quantity}</p>
                        <h2>{formatCurrency(price)}</h2>
                    </div>

                    <div className="options">
                        <p>Mover para os Favoritos</p> |
                        <button
                            type="button"
                            onClick={() => dispatch(removeFromCart(id))}
                            className="options--trash"
                        >
                            <Trash />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
