import { Button } from "../ui/button"

type Props = {
    resetForm: () => void
    reset: () => void
    sending: boolean
}

export function FormActions({ resetForm, reset, sending }: Props) {
    return (
        <div className="flex gap-2 justify-end">
            <Button
                type="button"
                variant="outline"
                onClick={() => {
                    reset()
                    resetForm()
                }}
            >
                Limpar
            </Button>
            <Button type="submit" disabled={sending}>
                {sending ? "Enviando..." : "Enviar"}
            </Button>
        </div>
    )
}
