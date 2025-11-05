interface Brand {
    id: number
    name: string
    urlToImage: string
}

interface BrandsItemProps {
    brands: Brand[]
}

export default function BrandsItem({ brands }: BrandsItemProps) {
    return (
        <ul>
            {brands.map((brand) => (
                <img
                    key={brand.id}
                    src={brand.urlToImage}
                    alt={`${brand.name} Logo`}
                    className={
                        brand.name === "Black Bull"
                            ? "blackBullBrand"
                            : brand.name === "NPL"
                            ? "nplBrand"
                            : ""
                    }
                />
            ))}
        </ul>
    )
}
