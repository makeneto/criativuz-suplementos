"use client"

import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import {
    Field,
    FieldSeparator,
    FieldSet,
    FieldLegend,
    FieldError,
} from "../ui/field"
import {
    Sheet,
    SheetTrigger,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetClose,
} from "@/components/ui/sheet"
import { Headset, X } from "lucide-react"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import SelectUI from "../search/SelectUI"
import { Textarea } from "../ui/textarea"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Button } from "../ui/button"
import { useSupportForm } from "@/hooks/useSupportForm"

const SUPPORT_CATEGORIES = [
    "Outra",
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

type FormValues = {
    nome: string
    email: string
    telefone?: string
    mensagem: string
    contatoPreferencia: string
}

export default function HelpSheet() {
    const [open, setOpen] = useState(false)
    const { sending, handleSubmit: submitSupport } = useSupportForm({
        onClose: () => setOpen(false),
    })

    const [category, setCategory] = useState("Outra")
    const [urgency, setUrgency] = useState("Alta")

    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors },
    } = useForm<FormValues>({
        defaultValues: {
            nome: "",
            email: "",
            telefone: "",
            mensagem: "",
            contatoPreferencia: "Email",
        },
    })

    const handleReset = () => {
        reset()
        setCategory("Outra")
        setUrgency("Alta")
    }

    const onSubmit = async (data: FormValues) => {
        try {
            await submitSupport({
                ...data,
                categoria: category,
                urgencia: urgency,
            })

            handleReset()
            setOpen(false)
        } catch (e) {
            console.error(e)
        }
    }

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

                <form
                    className="mt-5 flex flex-col gap-10 h-[87%]"
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                >
                    <Field data-invalid={!!errors.nome}>
                        <Label htmlFor="nome">Nome</Label>
                        <Input
                            type="text"
                            id="nome"
                            {...register("nome", {
                                required: "Nome é obrigatório",
                                minLength: {
                                    value: 2,
                                    message: "Nome muito curto",
                                },
                            })}
                            placeholder="Makene Neto"
                        />
                        {errors.nome && <FieldError errors={[errors.nome]} />}
                    </Field>

                    <Field data-invalid={!!errors.email}>
                        <Label htmlFor="email">Email</Label>
                        <Input
                            type="email"
                            id="email"
                            {...register("email", {
                                required: "Email é obrigatório",
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Email inválido",
                                },
                            })}
                            placeholder="user@exemplo.com"
                        />
                        {errors.email && <FieldError errors={[errors.email]} />}
                    </Field>

                    <Field data-invalid={!!errors.telefone}>
                        <Label htmlFor="telefone">Telefone / WhatsApp</Label>
                        <Input
                            type="text"
                            id="telefone"
                            maxLength={9}
                            {...register("telefone", {
                                required: "Telefone é obrigatório",
                                pattern: {
                                    value: /^9\d{8}$/,
                                    message: "Número de telefone inválido",
                                },
                            })}
                            placeholder="912345678"
                        />
                        {errors.telefone && (
                            <FieldError errors={[errors.telefone]} />
                        )}
                    </Field>

                    <div className="flex gap-5">
                        <Field className="flex-1">
                            <Label>Categoria</Label>
                            <SelectUI
                                name={category}
                                content={SUPPORT_CATEGORIES}
                                isLabel={true}
                                onSelect={(cat) => setCategory(cat)}
                            />
                        </Field>

                        <Field className="flex-1">
                            <Label>Nível de urgência</Label>
                            <SelectUI
                                name={urgency}
                                content={URGENCY}
                                isLabel={true}
                                onSelect={(urgency) => setUrgency(urgency)}
                            />
                        </Field>
                    </div>

                    <Field data-invalid={!!errors.mensagem}>
                        <Label htmlFor="mensagem">Descrição do problema</Label>
                        <Textarea
                            id="mensagem"
                            {...register("mensagem", {
                                required: "Descrição é obrigatória",
                                minLength: {
                                    value: 10,
                                    message: "Descrição muito curta",
                                },
                            })}
                            placeholder="Explique seu problema detalhadamente."
                        />
                    </Field>

                    <FieldSeparator />

                    <FieldSet>
                        <FieldLegend variant="label">
                            Escolha onde receberá a mensagem
                        </FieldLegend>

                        <Controller
                            control={control}
                            name="contatoPreferencia"
                            defaultValue="Email"
                            render={({ field }) => (
                                <RadioGroup
                                    value={field.value}
                                    onValueChange={field.onChange}
                                >
                                    <div className="flex items-center gap-3 mt-3">
                                        <RadioGroupItem
                                            value="Email"
                                            id="network1"
                                        />
                                        <label
                                            htmlFor="network1"
                                            className="text-sm"
                                        >
                                            Email
                                        </label>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <RadioGroupItem
                                            value="WhatsApp"
                                            id="network2"
                                        />
                                        <label
                                            htmlFor="network2"
                                            className="text-sm"
                                        >
                                            WhatsApp
                                        </label>
                                    </div>
                                </RadioGroup>
                            )}
                        />
                    </FieldSet>

                    {/* BOTÕES */}
                    <Field orientation="horizontal">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleReset}
                        >
                            Limpar
                        </Button>
                        <Button type="submit" disabled={sending}>
                            {sending ? "Enviando..." : "Enviar"}
                        </Button>
                    </Field>
                </form>
            </SheetContent>
        </Sheet>
    )
}
