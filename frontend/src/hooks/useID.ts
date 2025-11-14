import { useRef } from "react"

export function useID() {
    const idRef = useRef<string>(String(Date.now()))

    return idRef.current
}
