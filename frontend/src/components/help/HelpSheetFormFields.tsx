import { Field, FieldError } from "../ui/field"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { UseFormRegister, FieldErrors } from "react-hook-form"

type Props = {
    register: UseFormRegister<any>
    errors: FieldErrors
}

export function HelpSheetFormFields({ register, errors }: Props) {
    return (
        <>
            <div className="grid gap-9 sm:grid-cols-2 sm:gap-8">
                <Field data-invalid={!!errors.nome}>
                    <Label htmlFor="nome" className="flex gap-[0.3rem]">
                        Nome <span className="text-red-600">*</span>
                    </Label>
                    <Input
                        type="text"
                        id="nome"
                        placeholder="Makene Neto"
                        {...register("nome", {
                            required: "Nome é obrigatório",
                            minLength: { value: 2, message: "Nome muito curto" },
                        })}
                    />
                    {errors.nome && <FieldError errors={[errors.nome]} />}
                </Field>
                <Field data-invalid={!!errors.email}>
                    <Label htmlFor="email" className="flex gap-[0.3rem]">
                        Email <span className="text-red-600">*</span>
                    </Label>
                    <Input
                        type="email"
                        id="email"
                        placeholder="user@exemplo.com"
                        {...register("email", {
                            required: "Email é obrigatório",
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Email inválido",
                            },
                        })}
                    />
                    {errors.email && <FieldError errors={[errors.email]} />}
                </Field>
            </div>

            <Field data-invalid={!!errors.telefone}>
                <Label htmlFor="telefone" className="flex gap-[0.3rem]">
                    Telefone / WhatsApp <span className="text-red-600">*</span>
                </Label>
                <Input
                    type="text"
                    id="telefone"
                    placeholder="912345678"
                    maxLength={9}
                    {...register("telefone", {
                        required: "Telefone é obrigatório",
                        pattern: {
                            value: /^9\d{8}$/,
                            message: "Número de telefone inválido",
                        },
                    })}
                />
                {errors.telefone && <FieldError errors={[errors.telefone]} />}
            </Field>
        </>
    )
}
