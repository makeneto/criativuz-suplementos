"use client"

import { useState } from "react"
import { useID } from "@/hooks/product/useID"
import { useAppSelector } from "@/redux/hooks"
import { RootState } from "@/redux/store"

export function useFavoriteSheet() {
    const [open, setOpen] = useState(false)
    const randomId = useID()
    const favoriteItems = useAppSelector(
        (state: RootState) => state.favorites.items
    )

    return { open, setOpen, randomId, favoriteItems }
}
