"use client"

import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface CartItem {
    id: string
    name: string
    image: string
    price: number
    discountPrice: number
    flavor: string
    weight: string
    category: string
    quantity: number
}

interface CartState {
    items: CartItem[]
}

const getInitialCart = (): CartItem[] => {
    if (typeof window === "undefined") return []
    try {
        const stored = localStorage.getItem("criativCart")
        return stored ? JSON.parse(stored) : []
    } catch {
        return []
    }
}

const initialState: CartState = {
    items: getInitialCart(),
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItem>) => {
            const existing = state.items.find(
                (i) =>
                    i.name === action.payload.name &&
                    i.weight === action.payload.weight &&
                    i.flavor === action.payload.flavor
            )

            if (existing) {
                existing.quantity += action.payload.quantity
            } else {
                state.items.unshift(action.payload)
            }

            localStorage.setItem("criativCart", JSON.stringify(state.items))
        },

        removeFromCart: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter((i) => i.id !== action.payload)
            localStorage.setItem("criativCart", JSON.stringify(state.items))
        },

        clearCart: (state) => {
            state.items = []
            localStorage.removeItem("criativCart")
        },

        updateQuantity: (state, action) => {
            const { id, quantity } = action.payload
            const item = state.items.find((i) => i.id === id)
            if (item) item.quantity = quantity
        },
    },
})

export const { addToCart, removeFromCart, clearCart, updateQuantity } =
    cartSlice.actions
export default cartSlice.reducer
