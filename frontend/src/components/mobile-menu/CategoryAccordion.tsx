import Link from "next/link"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "../ui/accordion"
import { useCategories } from "@/hooks/search/useCategories"

interface Props {
    toggleMenu: () => void
}

export function CategoryAccordion({ toggleMenu }: Props) {
    const { mainCategories, getProductsByCategory } = useCategories()

    console.log(mainCategories)
    console.log(getProductsByCategory(mainCategories[0]))

    return (
        <Accordion type="single" collapsible>
            {mainCategories.map((category) => {
                const products = getProductsByCategory(category)

                return (
                    <AccordionItem
                        key={category}
                        value={category}
                        className="border-none"
                    >
                        <AccordionTrigger>{category}</AccordionTrigger>

                        <AccordionContent>
                            <div className="flex flex-col gap-4 pl-3">
                                {products.map((prod: any) =>
                                    prod?.name ? (
                                        <Link
                                            key={prod.id}
                                            href={`/products/${prod.id}`}
                                            onClick={toggleMenu}
                                            className="hover:underline"
                                        >
                                            {prod.name}
                                        </Link>
                                    ) : null
                                )}
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                )
            })}
        </Accordion>
    )
}
