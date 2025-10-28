import Image from "next/image"
import { useState } from "react"

interface ProductGalleryProps {
    src: string
    alt: string
    isProductPage?: boolean
    product: any
}

export default function ProductGallery({
    src,
    alt,
    isProductPage,
    product,
}: ProductGalleryProps) {
    const [selectedImage, setSelectedImage] = useState(src)
    const [selectedIndex, setSelectedIndex] = useState(0)

    const handleSelectImage = (image: string, index: number) => {
        setSelectedImage(image)
        setSelectedIndex(index)
    }

    return (
        <aside className="productGallery">
            <img
                src={selectedImage}
                alt={alt}
                className={`${
                    isProductPage ? "productGallery" : "modalProduct"
                }--main`}
                style={{ backgroundColor: "#fff" }}
            />

            <ul className="productGallery__options">
                {product.postImages.map((image: string, index: number) => (
                    <li
                        key={index}
                        onClick={() => handleSelectImage(image, index)}
                        className={`productGallery__thumb${
                            selectedIndex === index ? "--active" : "--inactive"
                        }`}
                    >
                        <Image
                            src={image}
                            alt={`${product.name} ${index + 1}`}
                            width={100}
                            height={100}
                            className="productGallery__image"
                        />
                    </li>
                ))}
            </ul>
        </aside>
    )
}
