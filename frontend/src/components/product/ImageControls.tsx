import { ArrowLeft, ArrowRight } from "lucide-react"

interface ImageControlsProps {
    selectedIndex: number
    setSelectedIndex: React.Dispatch<React.SetStateAction<number>>
    product: {
        postImages: string[]
    }
}

export default function ImageControls({
    selectedIndex,
    setSelectedIndex,
    product,
}: ImageControlsProps) {
    const handlePrev = () => {
        if (selectedIndex === 0) return
        setSelectedIndex(selectedIndex - 1)
    }

    const handleNext = () => {
        if (selectedIndex === product.postImages.length - 1) return
        setSelectedIndex(selectedIndex + 1)
    }

    if (product.postImages.length === 1) return null

    return (
        <div className="absolute inset-0 flex items-center justify-between px-2">
            <button
                onClick={handlePrev}
                disabled={selectedIndex === 0}
                className={`bg-zinc-500 transition-all text-white p-2 rounded-full 
                    ${
                        selectedIndex === 0
                            ? "opacity-30 cursor-not-allowed"
                            : "hover:bg-zinc-600"
                    }`}
            >
                <ArrowLeft className="w-4 h-4" />
            </button>

            <button
                onClick={handleNext}
                disabled={selectedIndex === product.postImages.length - 1}
                className={`bg-zinc-500 transition-all text-white p-2 rounded-full 
                    ${
                        selectedIndex === product.postImages.length - 1
                            ? "opacity-20 cursor-not-allowed"
                            : "hover:bg-zinc-600"
                    }`}
            >
                <ArrowRight className="w-4 h-4" />
            </button>
        </div>
    )
}
