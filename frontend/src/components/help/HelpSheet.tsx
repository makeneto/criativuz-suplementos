"use client"

import {
    Sheet,
    SheetTrigger,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetClose,
} from "@/components/ui/sheet"
import { Headset, X } from "lucide-react"
import { Controller } from "react-hook-form"

import { useState } from "react"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import SelectUI from "../search/SelectUI"
import { Textarea } from "../ui/textarea"
import { Checkbox } from "../ui/checkbox"
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSeparator,
    FieldSet,
} from "../ui/field"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Button } from "../ui/button"

const tasks = [
    { id: "followup", label: "Quero receber atualizações sobre meu ticket" },
    { id: "notifyMe", label: "Notificar-me sobre mudanças no pedido" },
    { id: "urgentCall", label: "Preciso de contato urgente" },
]

const SUPPORT_CATEGORIES = [
    "Outro",
    "Atraso na entrega",
    "Produto danificado",
    "Sabor errado",
    "Trocar produto",
    "Reembolso",
    "Alterar pedido",
    "Cancelar pedido",
    "Dúvidas suplementos",
]
const URGENCY = ["Alta", "Média", "Baixa"]

export default function HelpSheet() {
    const [open, setOpen] = useState(false)

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <div className="userAction">
                    <Headset className="w-5 h-5" />
                    <p>Ajuda</p>
                </div>
            </SheetTrigger>

            <SheetContent>
                <SheetHeader>
                    <SheetTitle className="text-lg font-semibold">
                        Suporte ao cliente
                    </SheetTitle>

                    <SheetClose className="closeSheetButton">
                        <X size={20} />
                    </SheetClose>
                </SheetHeader>

                <form className="mt-5 flex flex-col gap-10 h-[87%]">
                    <Label htmlFor="name">
                        Nome
                        <Input
                            type="text"
                            id="name"
                            placeholder="Makene Neto"
                        />
                    </Label>

                    <Label htmlFor="email">
                        Email
                        <Input
                            type="email"
                            id="email"
                            placeholder="user@exemplo.com"
                        />
                    </Label>

                    <Label htmlFor="phoneNumber">
                        Telefone / WhatsApp
                        <Input
                            type="number"
                            id="phoneNumber"
                            placeholder="9XX XXX XXX"
                        />
                    </Label>
                    <div className="flex gap-5">
                        <Label htmlFor="category">
                            <p className="mb-[-3] pl-1">Categoria</p>
                            <SelectUI
                                name="Outro"
                                content={SUPPORT_CATEGORIES}
                                isLabel={true}
                            />
                        </Label>

                        <Label htmlFor="category">
                            <p className="mb-[-3] pl-1">Nível de urgência</p>
                            <SelectUI
                                name="Alta"
                                content={URGENCY}
                                isLabel={true}
                            />
                        </Label>
                    </div>

                    <Label htmlFor="message">
                        Descrição do problema
                        <Textarea
                            placeholder="Explique seu problema detalhadamente."
                            id="message"
                        />
                    </Label>

                    <FieldSeparator />

                    <FieldSet>
                        <FieldLegend variant="label">
                            Escolha onde receberá a mensagem
                        </FieldLegend>

                        <RadioGroup defaultValue="network1">
                            <div className="flex items-center gap-3 mt-3">
                                <RadioGroupItem value="network1" id="network1" />
                                <label htmlFor="network1" className="text-sm">
                                    Email
                                </label>
                            </div>
                            <div className="flex items-center gap-3">
                                <RadioGroupItem
                                    value="WhatsApp"
                                    id="network2"
                                />
                                <label htmlFor="network2" className="text-sm">
                                    WhatsApp
                                </label>
                            </div>
                        </RadioGroup>
                    </FieldSet>

                    <Field orientation="horizontal">
                        <Button
                            type="button"
                            variant="outline"
                            // onClick={() => form.reset()}
                        >
                            Limpar
                        </Button>

                        <Button type="submit" form="form-rhf-demo">
                            Enviar
                        </Button>
                    </Field>
                </form>
            </SheetContent>
        </Sheet>
    )
}
