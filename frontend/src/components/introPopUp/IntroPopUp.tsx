"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { useAutoDialog } from "@/hooks/dialog/useAutoDialog"
import { useMediaQuery } from "react-responsive"

export function IntroPopUp() {
    const { open, setOpen } = useAutoDialog()
    const isAvailable = useMediaQuery({ minWidth: 374 })

    return (
        <Dialog open={open && isAvailable} onOpenChange={setOpen}>
            <DialogContent className="w-[95%] sm:w-[96%] md:w-[50rem] flex flex-col sm:flex-row gap-4">
                <img
                    src="/images/popupImage.webp"
                    alt="Hero Bg"
                    className="w-full sm:w-[17rem] md:w-[40%] object-cover"
                />

                <div className="pt-4 pb-6 px-5 sm:py-9 sm:px-9 flex-1">
                    <DialogHeader>
                        <DialogTitle>Criativuz Suplementos</DialogTitle>
                        <DialogDescription>
                            Na Criativuz, selecionamos apenas suplementos que
                            realmente funcionam, com informações claras e
                            objetivas para você tomar decisões conscientes.
                            Nosso objetivo é simplificar o mundo dos
                            suplementos: mostrar o que é essencial, explicar
                            como usar e desmistificar promessas vazias. Aqui,
                            você encontra produtos de qualidade, informações
                            transparentes e orientações práticas — sem exageros,
                            sem confusão, só o que faz sentido para sua
                            performance.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="signature">
                        <img
                            src="/icons/signature.webp"
                            alt="Criativuz Signature"
                        />
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
