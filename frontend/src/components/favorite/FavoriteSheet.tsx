"use client"

import { Sheet, SheetTrigger } from "@/components/ui/sheet"
import { Heart } from "lucide-react"
import { Badge } from "../ui/badge"
import FavoriteSheetContent from "./FavoriteSheetContent"
import { useFavoriteSheet } from "@/hooks/favorite/useFavoriteSheet"

export default function FavoriteSheet() {
    const { open, setOpen, randomId, favoriteItems } = useFavoriteSheet()
    const favoriteLength = favoriteItems.length

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

            <FavoriteSheetContent
                favoriteItems={favoriteItems}
                randomId={randomId}
            />
        </Sheet>
    )
}
