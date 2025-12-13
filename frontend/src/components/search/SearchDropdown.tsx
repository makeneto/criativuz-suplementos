import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import SearchResultItem from "../navbar/SearchResultItem"

interface Props {
    searchTerm: string
    filteredProducts: any[]
    onItemClick: () => void
}

export default function SearchDropdown({
    searchTerm,
    filteredProducts,
    onItemClick,
}: Props) {
    return (
        <ul className="nav__bar__search-dropdown">
            {filteredProducts.length > 0 && (
                <>
                    <h5>Produtos</h5>
                    {filteredProducts
                        .filter((p) => p.inStock)
                        .slice(0, 4)
                        .map((prod) => (
                            <SearchResultItem
                                key={prod.id}
                                prod={prod}
                                onClick={onItemClick}
                            />
                        ))}
                </>
            )}

            <Link
                href={`/search?query=${encodeURIComponent(searchTerm)}`}
                onClick={onItemClick}
            >
                <h6
                    className={
                        filteredProducts.length > 0
                            ? "withProducts"
                            : "noProducts"
                    }
                >
                    <span>{`Pesquisar por "${searchTerm}"`}</span>
                    <ArrowUpRight />
                </h6>
            </Link>
        </ul>
    )
}
