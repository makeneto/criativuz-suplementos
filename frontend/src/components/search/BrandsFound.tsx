"use client"

import { Checkbox } from "../ui/checkbox"
import { Label } from "../ui/label"

interface BrandsFoundProps {
    selectedBrands: string[]
    onChange: (brands: string[]) => void
    availableBrands: string[]
}

export default function BrandsFound({
    selectedBrands,
    onChange,
    availableBrands,
}: BrandsFoundProps) {
    const toggleBrand = (brand: string) => {
        if (selectedBrands.includes(brand)) {
            onChange(selectedBrands.filter((b) => b !== brand))
        } else {
            onChange([...selectedBrands, brand])
        }
    }

    return (
        <div className="grid gap-4">
            {availableBrands.map((brand, idx) => (
                <div key={idx} className="flex items-center gap-3">
                    <Checkbox
                        id={`brand-${idx}`}
                        className="checkboxRed w-5 h-5"
                        checked={selectedBrands.includes(brand)}
                        onCheckedChange={() => toggleBrand(brand)}
                    />
                    <Label htmlFor={`brand-${idx}`} className="text-[0.87rem]">
                        {brand}
                    </Label>
                </div>
            ))}
        </div>
    )
}
