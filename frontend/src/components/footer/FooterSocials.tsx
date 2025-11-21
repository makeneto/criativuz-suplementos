import { Mail, Instagram, Facebook } from "lucide-react"
import Link from "next/link"

export default function FooterSocials() {
    return (
        <div className="footer__socials">
            <Link href="mailto:">
                <Mail size={30} />
            </Link>
            <Link href="https://www.instagram.com/criativuz_suplementos">
                <Instagram size={27} />
            </Link>
            <Link href="https://www.facebook.com/profile.php?id=100092004847808">
                <Facebook size={27} />
            </Link>
        </div>
    )
}
