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
import { Controller, useForm } from "react-hook-form"

import { useState } from "react"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import SelectUI from "../search/SelectUI"
import { Textarea } from "../ui/textarea"
import {
    Field,
    FieldSeparator,
    FieldSet,
    FieldLegend,
    FieldError,
} from "../ui/field"
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
    categoria: string
    urgencia: string
    mensagem: string
    contatoPreferencia: string
}

export default function HelpSheet() {
    const [open, setOpen] = useState(false)
    const { sending, handleSubmit: submitSupport } = useSupportForm({
        onClose: () => setOpen(false),
    })

    const {
        register,
        handleSubmit,
        control,
        reset,
        setValue,
        formState: { errors },
    } = useForm<FormValues>({
        defaultValues: {
            nome: "",
            email: "",
            telefone: "",
            categoria: "Outra",
            urgencia: "Média",
            mensagem: "",
            contatoPreferencia: "Email",
        },
    })

    const handleReset = () => {
        reset({
            nome: "",
            email: "",
            telefone: "",
            categoria: "Outra",
            urgencia: "Média",
            mensagem: "",
            contatoPreferencia: "Email",
        })
    }

    const onSubmit = async (data: FormValues) => {
        try {
            await submitSupport(data)
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
                            aria-invalid={!!errors.nome}
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
                            aria-invalid={!!errors.email}
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
                            inputMode="numeric"
                            maxLength={9}
                            aria-invalid={!!errors.telefone}
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
                        <Field
                            className="flex-1"
                            data-invalid={!!errors.categoria}
                        >
                            <Label htmlFor="categoria">
                                <span className="mb-[-3] pl-1">Categoria</span>
                            </Label>
                            <Controller
                                control={control}
                                name="categoria"
                                rules={{ required: "Escolha uma categoria" }}
                                render={({ field, fieldState }) => (
                                    <>
                                        <SelectUI
                                            name={field.value}
                                            content={SUPPORT_CATEGORIES}
                                            isLabel={true}
                                            onValueChange={(v) => {
                                                field.onChange(v)
                                                setValue("categoria", v)
                                            }}
                                        />
                                        {fieldState.error && (
                                            <FieldError
                                                errors={[fieldState.error]}
                                            />
                                        )}
                                    </>
                                )}
                            />
                        </Field>

                        <Field
                            className="flex-1"
                            data-invalid={!!errors.urgencia}
                        >
                            <Label htmlFor="urgencia">
                                <span className="mb-[-3] pl-1">
                                    Nível de urgência
                                </span>
                            </Label>
                            <Controller
                                control={control}
                                name="urgencia"
                                rules={{
                                    required: "Escolha o nível de urgência",
                                }}
                                render={({ field, fieldState }) => (
                                    <>
                                        <SelectUI
                                            name={field.value}
                                            content={URGENCY}
                                            isLabel={true}
                                            onValueChange={(v) => {
                                                field.onChange(v)
                                                setValue("urgencia", v)
                                            }}
                                        />
                                        {fieldState.error && (
                                            <FieldError
                                                errors={[fieldState.error]}
                                            />
                                        )}
                                    </>
                                )}
                            />
                        </Field>
                    </div>

                    <Field data-invalid={!!errors.mensagem}>
                        <Label htmlFor="mensagem">Descrição do problema</Label>
                        <Textarea
                            id="mensagem"
                            aria-invalid={!!errors.mensagem}
                            {...register("mensagem", {
                                required: "Descrição é obrigatória",
                                minLength: {
                                    value: 10,
                                    message: "Descrição muito curta",
                                },
                            })}
                            placeholder="Explique seu problema detalhadamente."
                        />
                        {errors.mensagem && (
                            <FieldError errors={[errors.mensagem]} />
                        )}
                    </Field>

                    <FieldSeparator />

                    <FieldSet>
                        <FieldLegend variant="label">
                            Escolha onde receberá a mensagem
                        </FieldLegend>

                        <Field data-invalid={false}>
                            <Controller
                                control={control}
                                name="contatoPreferencia"
                                defaultValue="Email"
                                render={({ field }) => (
                                    <RadioGroup
                                        value={field.value}
                                        onValueChange={field.onChange}
                                        name="contacto"
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
                        </Field>
                    </FieldSet>

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
