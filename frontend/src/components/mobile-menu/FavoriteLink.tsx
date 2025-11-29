import Link from "next/link"
import { Heart } from "lucide-react"
import { Badge } from "../ui/badge"
import { useFavoriteSheet } from "@/hooks/favorite/useFavoriteSheet"

interface Props {
    toggleMenu: () => void
}

export function FavoriteLink({ toggleMenu }: Props) {
    const { favoriteItems } = useFavoriteSheet()
    const favoriteLength = favoriteItems.length

    return (
        <Link
            href="/favorites"
            onClick={toggleMenu}
            className="relative flex items-center justify-between py-3 font-semibold hover:underline"
        >
            Favoritos
            <Heart className="w-4 h-4" />
            {favoriteLength > 0 && (
                <Badge
                    variant="destructive"
                    className="absolute top-[19%] right-[-0.5rem] flex h-4 min-w-4 items-center justify-center rounded-full px-1 font-mono bg-white text-red-800"
                >
                    {favoriteLength}
                </Badge>
            )}
        </Link>
    )
}
