import {
    Sheet,
    SheetTrigger,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetClose,
} from "@/components/ui/sheet"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "../ui/accordion"
import { SlidersHorizontal, X } from "lucide-react"
import { useState } from "react"
import { SearchFilterProps } from "./SearchFilter"
import BrandsFound from "./BrandsFound"
import UserGoals from "./UserGoals"
import SelectUI from "./SelectUI"
import RangePrice from "../ui/RangePrice"
import { FieldSeparator } from "../ui/field"

export default function MobileFilterSheet({
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
    children,
}: SearchFilterProps) {
    const [open, setOpen] = useState(false)

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <div className="flex gap-3 items-center cursor-pointer p-1 filterButton">
                    <SlidersHorizontal className="w-4 h-4" />
                    <p>Filtrar</p>
                </div>
            </SheetTrigger>

            <SheetContent>
                <SheetHeader className="mt-[-0.5rem]">
                    <SheetTitle className="text-base font-semibold">
                        Filtrar por
                    </SheetTitle>
                    <SheetClose className="closeSheetButton">
                        <X size={20} />
                    </SheetClose>
                </SheetHeader>

                <div className="mt-5 flex flex-col gap-3">
                    <div className="flex flex-col gap-[2.2rem]">
                        {children}
                        <FieldSeparator />
                    </div>

                    <Accordion type="single" collapsible>
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
                </div>
            </SheetContent>
        </Sheet>
    )
}
