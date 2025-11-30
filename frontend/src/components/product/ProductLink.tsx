import Link from "next/link"
import React from "react"

interface ProductLink {
    inStock: boolean
    href: string
    className?: string
    onClick?: () => void
    children: React.ReactNode
}

export function ProductLink({
    inStock,
    href,
    children,
    className,
    onClick,
}: ProductLink) {
    if (!inStock) {
        return (
            <div
                className={`opacity-70 pointer-events-none cursor-not-allowed ${className}`}
            >
                {children}
            </div>
        )
    }

    return (
        <Link href={href} className={className} onClick={onClick}>
            {children}
        </Link>
    )
}
