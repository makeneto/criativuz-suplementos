interface ProductImageProps {
    src: string
    alt: string
}

export default function ProductImage({ src, alt }: ProductImageProps) {
    return (
        <img
            src={src}
            alt={alt}
            className="modalProduct__container--image"
            style={{ backgroundColor: "#fff" }}
        />
    )
}
