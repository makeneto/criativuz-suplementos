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
            <Field data-invalid={!!errors.nome}>
                <Label htmlFor="nome">Nome</Label>
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
                <Label htmlFor="email">Email</Label>
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

            <Field data-invalid={!!errors.telefone}>
                <Label htmlFor="telefone">Telefone / WhatsApp</Label>
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
