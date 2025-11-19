// RangePrice.tsx
"use client"

import { Field, FieldDescription } from "@/components/ui/field"
import { formatCurrency } from "@/utils/formatCurrency"

interface RangePriceProps {
    minPrice: number
    maxPrice: number
    value: number
    onChange: (v: number) => void
    onChangeEnd: (v: number) => void
}

export default function RangePrice({
    minPrice,
    maxPrice,
    value,
    onChange,
    onChangeEnd,
}: RangePriceProps) {
    return (
        <div className="w-full max-w-md">
            <Field>
                <FieldDescription className="mt-1">
                    Seu orçamento (
                    <span className="font-medium">
                        {formatCurrency(minPrice)}
                    </span>{" "}
                    -{" "}
                    <span className="font-medium tabular-nums">
                        {formatCurrency(value)}
                    </span>
                    )
                </FieldDescription>

                <input
                    type="range"
                    min={minPrice}
                    max={maxPrice}
                    step={500}
                    value={value}
                    onChange={(e) => onChange(Number(e.target.value))}
                    onMouseUp={(e) =>
                        onChangeEnd(
                            Number((e.target as HTMLInputElement).value)
                        )
                    }
                    onTouchEnd={(e) =>
                        onChangeEnd(
                            Number((e.target as HTMLInputElement).value)
                        )
                    }
                    className="w-full"
                />
            </Field>
        </div>
    )
}
