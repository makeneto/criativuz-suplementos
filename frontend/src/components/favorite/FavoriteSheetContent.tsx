import {
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetClose,
} from "@/components/ui/sheet"
import { X } from "lucide-react"
import FavoriteSheetItem from "./FavoriteSheetItem"

interface FavoriteSheetContentProps {
    favoriteItems: any[]
    randomId: string
}

export default function FavoriteSheetContent({
    favoriteItems,
    randomId,
}: FavoriteSheetContentProps) {
    const favoriteLength = favoriteItems.length

    return (
        <SheetContent>
            <SheetHeader>
                <SheetTitle className="text-lg font-semibold">
                    Favoritos{" "}
                    {favoriteLength > 0 && (
                        <span className="cartLength">({favoriteLength})</span>
                    )}
                </SheetTitle>
                <SheetClose className="closeSheetButton">
                    <X size={20} />
                </SheetClose>
            </SheetHeader>

            <div className="mt-5 flex flex-col gap-4 h-[87%]">
                {favoriteLength === 0 ? (
                    <div className="miniEmptySheet">
                        <img
                            src="/images/empty-cart.webp"
                            alt="Empty favorite"
                        />
                    </div>
                ) : (
                    favoriteItems.map((item) => (
                        <FavoriteSheetItem
                            key={`${item.id}-${randomId}`}
                            item={item}
                        />
                    ))
                )}
            </div>
        </SheetContent>
    )
}
