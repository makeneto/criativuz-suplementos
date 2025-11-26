import Image from "next/image"

interface DesktopThumbsProps {
    selectedIndex: number
    setSelectedIndex: React.Dispatch<React.SetStateAction<number>>
    product: any
}

export default function DesktopThumbs({
    selectedIndex,
    setSelectedIndex,
    product,
}: DesktopThumbsProps) {
    const handleSelectImage = (index: number) => {
        setSelectedIndex(index)
    }

    return (
        <ul className="productGallery__options flex gap-2 mt-2">
            {product.postImages.map((image: string, index: number) => (
                <li
                    key={index}
                    onClick={() => handleSelectImage(index)}
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
    )
}
