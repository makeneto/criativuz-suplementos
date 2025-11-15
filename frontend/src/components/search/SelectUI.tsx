import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface SelectUIProps {
    name: string
    isFilterBy?: boolean
    content: string[]
}

export default function SelectUI({
    name,
    content,
    isFilterBy = false,
}: SelectUIProps) {
    return (
        <div className="filterBy">
            {isFilterBy && <p className="font-medium mt-1">Filtrar por: </p>}

            <Select>
                <SelectTrigger className="w-[180px]">
                    <SelectValue
                        placeholder={isFilterBy ? name : `Escolha um ${name}`}
                    />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {/* <SelectLabel>{name}</SelectLabel> */}
                        {content.map((item, index) => (
                            <SelectItem value={item} key={index}>
                                {item}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    )
}
