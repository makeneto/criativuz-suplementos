"use client"

import { CategoryUrgencySelect } from "@/components/help/CategoryUrgencySelect"
import { ContactPreference } from "@/components/help/ContactPreference"
import { FormActions } from "@/components/help/FormActions"
import { HelpSheetFormFields } from "@/components/help/HelpSheetFormFields"
import { MessageField } from "@/components/help/MessageField"
import { FieldSeparator } from "@/components/ui/field"
import { SUPPORT_CATEGORIES, URGENCY } from "@/constants/helpForm"
import { useHelpForm } from "@/hooks/helpForm/useHelpForm"
import { useState } from "react"
import { useForm } from "react-hook-form"

export interface FormValues {
    nome: string
    email: string
    telefone?: string
    mensagem: string
    contatoPreferencia: string
}

export default function HelpPage() {
    const [open, setOpen] = useState(false)
    const {
        category,
        setCategory,
        urgency,
        setUrgency,
        sending,
        handleSubmit: submitSupport,
        resetForm,
    } = useHelpForm(() => setOpen(false))

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

    const onSubmit = async (data: FormValues) => {
        await submitSupport({ ...data, categoria: category, urgencia: urgency })
        reset()
        resetForm()
        setOpen(false)
    }

    return (
        <form
            className="mt-28 md:mt-35 flex flex-col gap-10 h-[87%] mb-8 md:mb-[5rem] px-4 md:px-8"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
        >
            <h1 className="font-semibold text-[1.3em]"><span className="lightTag">Criativuz</span> Support</h1>
            <HelpSheetFormFields register={register} errors={errors} />
            <CategoryUrgencySelect
                category={category}
                setCategory={setCategory}
                urgency={urgency}
                setUrgency={setUrgency}
                categories={SUPPORT_CATEGORIES}
                urgencies={URGENCY}
            />
            <MessageField register={register} errors={errors} />
            <FieldSeparator />
            <ContactPreference control={control} />
            <FormActions
                resetForm={resetForm}
                reset={reset}
                sending={sending}
            />
        </form>
    )
}
