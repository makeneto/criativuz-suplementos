import {
    Sheet,
    SheetTrigger,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetClose,
} from "@/components/ui/sheet"
import { Heart, X } from "lucide-react"

import { useAppSelector } from "@/redux/hooks"
import { RootState } from "@/redux/store"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Badge } from "../ui/badge"
import FavoriteSheetItem from "./FavoriteSheetItem"
import { useID } from "@/hooks/useID"

export default function FavoriteSheet() {
    const favoriteItems = useAppSelector(
        (state: RootState) => state.favorites.items
    )

    const { length: favoriteLength } = favoriteItems
    const [open, setOpen] = useState(false)
    const router = useRouter()
    const randomId = useID()

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <div className="userAction">
                    <Heart className="w-5 h-5" />
                    <p>
                        Favoritos
                        {favoriteLength > 0 && (
                            <Badge
                                className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
                                variant="destructive"
                            >
                                {favoriteLength}
                            </Badge>
                        )}
                    </p>
                </div>
            </SheetTrigger>

            <SheetContent>
                <SheetHeader>
                    <SheetTitle className="text-lg font-semibold">
                        Favoritos{" "}
                        {favoriteLength > 0 && (
                            <span className="cartLength">
                                ({favoriteLength})
                            </span>
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
        </Sheet>
    )
}
