import Link from "next/link"
import { Headset } from "lucide-react"

interface Props {
    toggleMenu: () => void
}

export function HelpLink({ toggleMenu }: Props) {
    return (
        <Link
            href="/help"
            onClick={toggleMenu}
            className="flex items-center justify-between py-3 font-semibold hover:underline"
        >
            Ajuda
            <Headset className="w-4 h-4" />
        </Link>
    )
}
