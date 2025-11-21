import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { updateQuantity } from "@/redux/slices/cartSlice"

export function useCartQuantity(id: string, initialQuantity: number) {
    const dispatch = useDispatch()

    const [qtd, setQtd] = useState(() => {
        const savedCart = JSON.parse(
            localStorage.getItem("criativCart") || "[]"
        )
        const currentItem = savedCart.find((i: any) => i.id === id)
        return currentItem ? currentItem.quantity : initialQuantity
    })

    useEffect(() => {
        const savedCart = JSON.parse(
            localStorage.getItem("criativCart") || "[]"
        )
        const updatedCart = savedCart.map((i: any) =>
            i.id === id ? { ...i, quantity: qtd } : i
        )
        localStorage.setItem("criativCart", JSON.stringify(updatedCart))

        // Atualiza Redux
        dispatch(updateQuantity({ id, quantity: qtd }))
    }, [qtd, id, dispatch])

    useEffect(() => {
        const handleStorageChange = () => {
            const savedCart = JSON.parse(
                localStorage.getItem("criativCart") || "[]"
            )
            const currentItem = savedCart.find((i: any) => i.id === id)
            if (currentItem) setQtd(currentItem.quantity)
        }

        window.addEventListener("storage", handleStorageChange)
        return () => window.removeEventListener("storage", handleStorageChange)
    }, [id])

    const handleQtd = (type: "add" | "subtract") => {
        setQtd((prev: number) => {
            if (type === "add") return prev + 1
            if (type === "subtract" && prev > 1) return prev - 1
            return prev
        })
    }

    return { qtd, handleQtd }
}
