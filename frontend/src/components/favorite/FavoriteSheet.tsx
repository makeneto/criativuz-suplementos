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
import { Activity, useState } from "react"
import { Badge } from "../ui/badge"
import FavoriteItem from "./FavoriteItem"

export default function FavoriteSheet() {
    const favoriteItems = useAppSelector(
        (state: RootState) => state.favorites.items
    )
    const { length: favoriteLength } = favoriteItems
    const [open, setOpen] = useState(false)
    const router = useRouter()

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <div className="userAction">
                    <Heart className="w-5 h-5" />
                    <p>
                        Favoritos
                        <Activity
                            mode={favoriteLength > 0 ? "visible" : "hidden"}
                        >
                            <Badge
                                className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
                                variant="destructive"
                            >
                                {favoriteLength}
                            </Badge>
                        </Activity>
                    </p>
                </div>
            </SheetTrigger>

            <SheetContent>
                <SheetHeader>
                    <SheetTitle className="text-lg font-semibold">
                        Favorito{" "}
                        <Activity mode={favoriteLength > 0 ? "visible" : "hidden"}>
                            <span className="cartLength">({favoriteLength})</span>
                        </Activity>
                    </SheetTitle>

                    {favoriteLength > 0 ? (
                        <button
                            onClick={() => {
                                setOpen(false)
                                router.push("/favorite")
                            }}
                            className="vewAllLink"
                        >
                            Ver todos
                        </button>
                    ) : (
                        <SheetClose className="closeSheetButton">
                            <X size={20} />
                        </SheetClose>
                    )}
                </SheetHeader>

                <div className="mt-8 flex flex-col gap-4 h-[87%]">
                    {favoriteLength === 0 ? (
                        <div className="miniEmptyfavorite">
                            <img
                                src="/images/empty-cart.webp"
                                alt="Empty favorite"
                            />
                        </div>
                    ) : (
                        favoriteItems.map((item) => (
                            <FavoriteItem key={item.id} item={item} />
                        ))
                    )}
                </div>
            </SheetContent>
        </Sheet>
    )
}
