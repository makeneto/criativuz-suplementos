import Link from "next/link"
import { motion } from "framer-motion"
import { Product } from "@/interfaces/interfaces"

interface Props {
    products: Product[]
    isOpen: boolean
    onToggle: () => void
}

export function CategoryDropdownList({ products, isOpen, onToggle }: Props) {
    return (
        <motion.div
            initial={false}
            animate={{ height: isOpen ? "auto" : 0 }}
            transition={{ duration: 0.2 }}
            style={{
                overflow: "hidden",
                visibility: isOpen ? "visible" : "hidden",
            }}
        >
            <ul className="nav_bar__products-list">
                {products.map((prod) => (
                    <li key={prod.id}>
                        <Link href={`/products/${prod.id}`} onClick={onToggle}>
                            {prod.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </motion.div>
    )
}
