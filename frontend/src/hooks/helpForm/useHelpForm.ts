import { useState } from "react"
import { useSupportForm } from "@/hooks/helpForm/useSupportForm"

export function useHelpForm(onClose: () => void) {
    const [category, setCategory] = useState("Outra")
    const [urgency, setUrgency] = useState("Alta")

    const { sending, handleSubmit } = useSupportForm({ onClose })

    const resetForm = () => {
        setCategory("Outra")
        setUrgency("Alta")
    }

    return {
        category,
        setCategory,
        urgency,
        setUrgency,
        sending,
        handleSubmit,
        resetForm,
    }
}
