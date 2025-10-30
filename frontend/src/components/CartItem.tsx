import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { removeFromCart } from "@/redux/slices/cartSlice"
import { Button } from "./ui/button"
import { Trash, TruckElectric } from "lucide-react"
import { formatCurrency } from "@/utils/formatCurrency"
import ProductQuantity from "./ui/ProductQuantity"

interface CartItemProps {
    id: string
    image: string
    name: string
    weight: string
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
    const { id, image, name, weight, flavour, price, quantity } = item

    const [qtd, setQtd] = useState(quantity)

    const handleQtd = (type: "add" | "subtract") =>
        setQtd((prev) => {
            if (type === "add") return prev + 1
            if (type === "subtract" && prev > 1) return prev - 1
            return prev
        })

    return (
        <div key={id} className="cartItem">
            <div className="cartItem__main">
                <img
                    src={image}
                    alt={name}
                    className="w-[6rem] h-[6rem] object-cover"
                />

                <div className="cartItem__content">
                    <h1>{name}</h1>

                    <div className="cartItem__content--details">
                        <p>
                            Peso: <span>{weight}</span>
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
                        <ProductQuantity
                            isSmall={true}
                            qtd={qtd}
                            onAdd={() => handleQtd("add")}
                            onSubtract={() => handleQtd("subtract")}
                        />
                        <h2>{formatCurrency(price * qtd)}</h2>
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
