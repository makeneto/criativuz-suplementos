import { useState, useRef, useEffect } from "react"

export function useMenuDropdown() {
    const [isOpen, setIsOpen] = useState(false)
    const ref = useRef<HTMLDivElement | null>(null)

    const close = () => setIsOpen(false)
    const toggle = () => setIsOpen((prev) => !prev)

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                close()
            }
        }

        if (isOpen) document.addEventListener("mousedown", handleClickOutside)
        return () =>
            document.removeEventListener("mousedown", handleClickOutside)
    }, [isOpen])

    return { isOpen, ref, open, close, toggle }
}
