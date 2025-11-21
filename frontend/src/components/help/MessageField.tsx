import { Field, FieldError } from "../ui/field"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"
import { UseFormRegister, FieldErrors } from "react-hook-form"

type Props = {
    register: UseFormRegister<any>
    errors: FieldErrors
}

export function MessageField({ register, errors }: Props) {
    return (
        <Field data-invalid={!!errors.mensagem}>
            <Label htmlFor="mensagem">Descrição do problema</Label>
            <Textarea
                id="mensagem"
                placeholder="Explique seu problema detalhadamente."
                {...register("mensagem", {
                    required: "Descrição é obrigatória",
                    minLength: { value: 10, message: "Descrição muito curta" },
                })}
            />
            {errors.mensagem && <FieldError errors={[errors.mensagem]} />}
        </Field>
    )
}
