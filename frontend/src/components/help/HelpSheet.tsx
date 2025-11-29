"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import {
    Sheet,
    SheetTrigger,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetClose,
} from "@/components/ui/sheet"
import { Headset, X } from "lucide-react"
import { FieldSeparator } from "../ui/field"
import { useHelpForm } from "@/hooks/helpForm/useHelpForm"
import { SUPPORT_CATEGORIES, URGENCY } from "@/constants/helpForm"
import { HelpSheetFormFields } from "./HelpSheetFormFields"
import { CategoryUrgencySelect } from "./CategoryUrgencySelect"
import { MessageField } from "./MessageField"
import { ContactPreference } from "./ContactPreference"
import { FormActions } from "./FormActions"
import { FormValues } from "@/app/help/page"

export default function HelpSheet() {
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
                    className="mt-5 flex flex-col gap-10 h-[87%]mb-4"
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                >
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
            </SheetContent>
        </Sheet>
    )
}
