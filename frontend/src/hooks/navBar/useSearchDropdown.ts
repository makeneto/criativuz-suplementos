import { useRef, useState, useEffect } from "react"

export function useSearchDropdown() {
    const inputRef = useRef<HTMLDivElement>(null)
    const [showDropdown, setShowDropdown] = useState(false)

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (
                inputRef.current &&
                !inputRef.current.contains(e.target as Node)
            ) {
                setShowDropdown(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () =>
            document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    return { inputRef, showDropdown, setShowDropdown }
}
