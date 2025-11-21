import { Field } from "../ui/field"
import { Label } from "../ui/label"
import SelectUI from "../search/SelectUI"

type Props = {
    category: string
    setCategory: (c: string) => void
    urgency: string
    setUrgency: (u: string) => void
    categories: string[]
    urgencies: string[]
}

export function CategoryUrgencySelect({
    category,
    setCategory,
    urgency,
    setUrgency,
    categories,
    urgencies,
}: Props) {
    return (
        <div className="flex gap-5">
            <Field className="flex-1">
                <Label>Categoria</Label>
                <SelectUI
                    name={category}
                    content={categories}
                    isLabel
                    onSelect={setCategory}
                />
            </Field>

            <Field className="flex-1">
                <Label>Nível de urgência</Label>
                <SelectUI
                    name={urgency}
                    content={urgencies}
                    isLabel
                    onSelect={setUrgency}
                />
            </Field>
        </div>
    )
}
