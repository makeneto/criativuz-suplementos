import { Atom } from "lucide-react"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

interface ProductDetailsProps {
    highlights: string[]
    info: string
    useCase: string
    usage: string
}

export default function ProductDetails({
    highlights,
    info,
    useCase,
    usage,
}: ProductDetailsProps) {
    return (
        <div className="productPage__details">
            <ul className="productPage__details--highlights">
                {highlights.map((item, i) => (
                    <li key={i}>
                        <Atom />
                        {item}
                    </li>
                ))}
            </ul>

            <Accordion type="single" defaultValue="item-1" collapsible>
                <AccordionItem value="item-1">
                    <AccordionTrigger>Informações</AccordionTrigger>
                    <AccordionContent>{info}</AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                    <AccordionTrigger>Quando usar?</AccordionTrigger>
                    <AccordionContent>{useCase}</AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                    <AccordionTrigger>Como usar?</AccordionTrigger>
                    <AccordionContent>{usage}</AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}
