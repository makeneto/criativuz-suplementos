import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "../ui/accordion"
import Availability from "./Availability"
import SelectUI from "./SelectUI"

interface SearchFilterProps {
    filterContent: string[]
}

export default function SearchFilter({ filterContent }: SearchFilterProps) {
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
                    <SelectUI name="sabor" content={filterContent} />
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
                <AccordionTrigger>Preço</AccordionTrigger>
                <AccordionContent>Teste 2</AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}
