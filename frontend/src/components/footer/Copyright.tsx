import useFooter from "@/hooks/footer/useFooter"
import { Activity } from "react"
import { useMediaQuery } from "react-responsive"

export default function Copyright() {
    const { currentYear } = useFooter()
    const isMobile = useMediaQuery({ maxWidth: 640 })

    return (
        <p style={{textAlign: isMobile ? "center" : "start"}}>
            © {currentYear} Criativuz Suplementos.{" "}
            <Activity mode={isMobile ? "visible" : "hidden"}>
                <br />
            </Activity>
            Todos os direitos reservados.
        </p>
    )
}
