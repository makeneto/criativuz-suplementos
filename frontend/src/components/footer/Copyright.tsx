import useFooter from "@/hooks/footer/useFooter"
import { useMediaQuery } from "react-responsive"

export default function Copyright() {
    const { currentYear } = useFooter()
    const isMobile = useMediaQuery({ maxWidth: 768 })

    return (
        <p style={{ textAlign: isMobile ? "center" : "start" }}>
            © {currentYear} Criativuz Suplementos. {isMobile && <br />}
            Todos os direitos reservados.
        </p>
    )
}
