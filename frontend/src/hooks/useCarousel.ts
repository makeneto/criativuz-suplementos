"use client"

import { useEffect, useRef, useState } from "react"

export function useCarousel(length: number, interval = 5000) {
    const [current, setCurrent] = useState(0)
    const timeoutRef = useRef<NodeJS.Timeout | null>(null)

    const resetTimeout = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }

    useEffect(() => {
        if (length === 0) return
        resetTimeout()
        timeoutRef.current = setTimeout(() => {
            setCurrent((prev) => (prev === length - 1 ? 0 : prev + 1))
        }, interval)
        return () => resetTimeout()
    }, [current, length, interval])

    const goTo = (index: number) => setCurrent(index)
    const next = () =>
        setCurrent((prev) => (prev === length - 1 ? 0 : prev + 1))
    const prev = () =>
        setCurrent((prev) => (prev === 0 ? length - 1 : prev - 1))

    return { current, next, prev, goTo }
}
