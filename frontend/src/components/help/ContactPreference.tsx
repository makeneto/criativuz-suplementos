import { Controller } from "react-hook-form"
import { FieldSet, FieldLegend } from "../ui/field"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"

type Props = {
    control: any
}

export function ContactPreference({ control }: Props) {
    return (
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
                            <RadioGroupItem value="Email" id="network1" />
                            <label htmlFor="network1" className="text-sm">
                                Email
                            </label>
                        </div>
                        <div className="flex items-center gap-3">
                            <RadioGroupItem value="WhatsApp" id="network2" />
                            <label htmlFor="network2" className="text-sm">
                                WhatsApp
                            </label>
                        </div>
                    </RadioGroup>
                )}
            />
        </FieldSet>
    )
}
