interface ProductImageProps {
    src: string
    alt: string
    isProductPage?: boolean
}

export default function ProductImage({
    src,
    alt,
    isProductPage,
}: ProductImageProps) {
    return (
        <img
            src={src}
            alt={alt}
            className={`${
                isProductPage ? "productPage" : "modalProduct"
            }__container--image`}
            style={{ backgroundColor: "#fff" }}
        />
    )
}
