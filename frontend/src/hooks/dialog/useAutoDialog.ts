// src/hooks/useAutoDialog.ts
"use client"

import { useEffect, useState } from "react"

export function useAutoDialog(
    delay: number = 2000,
    key: string = "introDialogShown"
) {
    const [open, setOpen] = useState(false)

    useEffect(() => {
        const alreadyShown = sessionStorage.getItem(key)

        if (!alreadyShown) {
            const timer = setTimeout(() => {
                setOpen(true)
                sessionStorage.setItem(key, "true")
            }, delay)

            return () => clearTimeout(timer)
        }
    }, [delay, key])

    return { open, setOpen }
}
