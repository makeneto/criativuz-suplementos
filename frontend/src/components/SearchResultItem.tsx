"use client"

import Link from "next/link"
import { formatCurrency } from "@/utils/formatCurrency"

export default function SearchResultItem({
    prod,
    onClick,
}: {
    prod: any
    onClick: () => void
}) {
    return (
        <li key={prod.id}>
            <Link href={`/produto/${prod.id}`} onClick={onClick}>
                <img
                    src={prod.postImages?.[0] || "/placeholder.png"}
                    alt={prod.name}
                    className="searchProductLogo"
                />
                <div>
                    <span style={{ fontWeight: 500 }}>{prod.name}</span>
                    <span>
                        {Array.isArray(prod.price)
                            ? formatCurrency(prod.price[0])
                            : ""}
                    </span>
                </div>
            </Link>
        </li>
    )
}
