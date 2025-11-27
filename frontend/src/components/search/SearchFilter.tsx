"use client"

import React from "react"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "../ui/accordion"
import RangePrice from "../ui/RangePrice"
import BrandsFound from "./BrandsFound"
import SelectUI from "./SelectUI"
import UserGoals from "./UserGoals"

export interface SearchFilterProps {
    filterContent: string[]
    selected: string | null
    onSelect: (value: string | null) => void
    minPrice: number
    maxPrice: number
    value: number
    onChange: (v: number) => void
    onChangeEnd: (v: number) => void

    selectedGoals: string[]
    onChangeGoals: (values: string[]) => void

    selectedBrands: string[]
    onChangeBrands: (values: string[]) => void
    availableBrands: string[] | any

    categoryOptions: string[] | any
    selectedCategory: string | null
    onChangeCategory: (value: string | null) => void

    children?: React.ReactNode
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
    selectedGoals,
    onChangeGoals,
    selectedBrands,
    onChangeBrands,
    availableBrands,
    categoryOptions,
    selectedCategory,
    onChangeCategory,
}: SearchFilterProps) {
    return (
        <Accordion type="single" defaultValue="item-1" collapsible>
            <AccordionItem value="item-1">
                <AccordionTrigger>Marca</AccordionTrigger>
                <AccordionContent className="pl-4">
                    <BrandsFound
                        selectedBrands={selectedBrands}
                        onChange={onChangeBrands}
                        availableBrands={availableBrands}
                    />
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
                <AccordionTrigger>Objetivo</AccordionTrigger>
                <AccordionContent className="pl-4">
                    <UserGoals
                        selectedGoals={selectedGoals}
                        onChange={onChangeGoals}
                    />
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
                <AccordionTrigger>Categoria</AccordionTrigger>
                <AccordionContent>
                    <SelectUI
                        name="Todas"
                        content={categoryOptions}
                        isLabel={true}
                        isCapitalize={true}
                        selected={selectedCategory ?? selected}
                        onSelect={onChangeCategory}
                    />
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
                <AccordionTrigger>Sabor</AccordionTrigger>
                <AccordionContent>
                    <SelectUI
                        name="Sabor"
                        content={filterContent}
                        selected={selected}
                        onSelect={onSelect}
                    />
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
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
