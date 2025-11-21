interface ProductImageProps {
    src: string
    alt: string
    isProductPage?: boolean
}

export default function PModalImage({
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
