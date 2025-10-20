"use client"

import Link from "next/link"
import { useScrollVisibility } from "@/hooks/useScrollVisibility"
import WhatsAppIcon from "./ui/WhatsAppIcon"

export default function WhatsAppButton() {
    const isVisible = useScrollVisibility(200)

    return (
        <Link
            href="https://wa.me/244923801395"
            target="_blank"
            rel="noopener noreferrer"
            className={`whatsapp-btn ${isVisible ? "visible" : "hidden"}`}
        >
            <WhatsAppIcon />
            <span className="whatsapp-bg"></span>
        </Link>
    )
}
