// SearchFilter.tsx
"use client"

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "../ui/accordion"
import RangePrice from "../ui/RangePrice"
import Availability from "./Availability"
import SelectUI from "./SelectUI"

interface SearchFilterProps {
    filterContent: string[]
    selected: string | null
    onSelect: (value: string | null) => void
    minPrice: number
    maxPrice: number
    value: number
    onChange: (v: number) => void
    onChangeEnd: (v: number) => void
}

export default function SearchFilter({
    filterContent,
    selected,
    onSelect,
    minPrice,
    maxPrice,
    value,
    onChange,
    onChangeEnd,
}: SearchFilterProps) {
    return (
        <Accordion type="single" defaultValue="item-1" collapsible>
            <AccordionItem value="item-1">
                <AccordionTrigger>Disponibilidade</AccordionTrigger>
                <AccordionContent>
                    <Availability />
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
                <AccordionTrigger>Sabor</AccordionTrigger>
                <AccordionContent>
                    <SelectUI
                        name="sabor"
                        content={filterContent}
                        selected={selected}
                        onSelect={onSelect}
                    />
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
                <AccordionTrigger>Preço</AccordionTrigger>
                <AccordionContent>
                    <RangePrice
                        minPrice={minPrice}
                        maxPrice={maxPrice}
                        value={value}
                        onChange={onChange}
                        onChangeEnd={onChangeEnd}
                    />
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}
