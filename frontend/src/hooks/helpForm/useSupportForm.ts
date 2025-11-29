import { useState } from "react"
import { toast } from "sonner"

export function useSupportForm({ onClose }: { onClose: () => void }) {
    const [sending, setSending] = useState(false)

    const handleSubmit = async (data: Record<string, any>) => {
        setSending(true)

        try {
            const formData = new FormData()
            formData.append("Nome", data.nome ?? "")
            formData.append("Email", data.email ?? "")
            formData.append("Telefone", data.telefone ?? "")
            formData.append("Categoria", data.categoria ?? "Outra")
            formData.append("Nível de Urgência", data.urgencia ?? "Alta")
            formData.append("Mensagem", data.mensagem ?? "")
            formData.append(
                "Contato Preferência",
                data.contatoPreferencia ?? "Email"
            )

            const response = await fetch("https://formspree.io/f/movrvodq", {
                method: "POST",
                body: formData,
                headers: { Accept: "application/json" },
            })

            setSending(false)

            if (response.ok) {
                toast.success("Mensagem enviada com sucesso.")
                onClose()
            } else {
                toast.error("Erro ao enviar. Tente novamente.")
            }
        } catch (e) {
            setSending(false)
            toast.error("Erro ao enviar. Tente novamente.")
            console.error(e)
        }
    }

    return {
        sending,
        handleSubmit,
    }
}
