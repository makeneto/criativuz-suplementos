"use client"

import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface FavoriteItem {
    id: string | number
    postImages: string[]
    name: string
    price: number | number[]
    discountPrice: number | number[]
}

interface FavoriteState {
    items: FavoriteItem[]
}

const getInitialFavorites = (): FavoriteItem[] => {
    if (typeof window === "undefined") return []
    try {
        const stored = localStorage.getItem("criativFavorites")
        return stored ? (JSON.parse(stored) as FavoriteItem[]) : []
    } catch {
        return []
    }
}

const initialState: FavoriteState = {
    items: getInitialFavorites(),
}

const favoriteSlice = createSlice({
    name: "favorites",
    initialState,
    reducers: {
        addToFavorites: (state, action: PayloadAction<FavoriteItem>) => {
            const exists = state.items.some(
                (i) => String(i.id) === String(action.payload.id)
            )

            if (!exists) {
                state.items.unshift(action.payload)
                localStorage.setItem(
                    "criativFavorites",
                    JSON.stringify(state.items)
                )
            }
        },

        removeFromFavorites: (
            state,
            action: PayloadAction<string | number>
        ) => {
            state.items = state.items.filter(
                (i) => String(i.id) !== String(action.payload)
            )
            localStorage.setItem(
                "criativFavorites",
                JSON.stringify(state.items)
            )
        },

        clearFavorites: (state) => {
            state.items = []
            localStorage.removeItem("criativFavorites")
        },
    },
})

export const { addToFavorites, removeFromFavorites, clearFavorites } =
    favoriteSlice.actions
export default favoriteSlice.reducer
