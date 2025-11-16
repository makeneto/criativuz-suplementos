"use client"

import { useState } from "react"

import { Field, FieldDescription } from "@/components/ui/field"
import { Slider } from "@/components/ui/slider"
import { formatCurrency } from "@/utils/formatCurrency"

export default function RangePrice() {
    const [value, setValue] = useState([12000, 50000])

    return (
        <div className="w-full max-w-md">
            <Field>
                <FieldDescription className="mt-1">
                    Seu orçamento (
                    <span className="font-medium">
                        {formatCurrency(value[0])}{" "}
                    </span>
                    -{" "}
                    <span className="font-medium tabular-nums">
                        {formatCurrency(value[1])}
                    </span>
                    ).
                </FieldDescription>
                <Slider
                    value={value}
                    onValueChange={setValue}
                    min={0}
                    max={80000}
                    step={10}
                    className="mt-2 w-full"
                    aria-label="Price Range"
                />
            </Field>
        </div>
    )
}
