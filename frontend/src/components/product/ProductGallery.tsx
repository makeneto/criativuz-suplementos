import { useState, useEffect } from "react"
import { useMediaQuery } from "react-responsive"
import ImageControls from "./ImageControls"
import DesktopThumbs from "./DesktopThumbs"

interface ProductGalleryProps {
    imageIndex: number
    alt: string
    isProductPage?: boolean
    product: any
}

export default function ProductGallery({
    imageIndex,
    alt,
    isProductPage,
    product,
}: ProductGalleryProps) {
    const [selectedIndex, setSelectedIndex] = useState(imageIndex)
    const isMobile = useMediaQuery({ maxWidth: 640 })

    useEffect(() => {
        setSelectedIndex(imageIndex)
    }, [imageIndex])

    return (
        <aside className="productGallery relative">
            <img
                src={product.postImages[selectedIndex]}
                alt={alt}
                className={`${
                    isProductPage ? "productGallery" : "modalProduct"
                }--main`}
            />

            {isMobile && product.postImages.length > 1 ? (
                <ImageControls
                    selectedIndex={selectedIndex}
                    setSelectedIndex={setSelectedIndex}
                    product={product}
                />
            ) : !isMobile ? (
                <DesktopThumbs
                    selectedIndex={selectedIndex}
                    setSelectedIndex={setSelectedIndex}
                    product={product}
                />
            ) : null}
        </aside>
    )
}
