import { ArrowLeft } from "lucide-react"

export default function CartHeader({
    length,
    onBack,
}: {
    length: number
    onBack: () => void
}) {
    return (
        <header className="cartPage__header">
            <h1 className="cartPage__header--title">
                🛒 Carrinho {length === 0 && "está vazio"}
            </h1>
            
            <p onClick={onBack}>
                <ArrowLeft size={18} />
                Voltar
            </p>
        </header>
    )
}
