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
    isLabel?: boolean
    content: string[]
    selected?: string | null
    isCapitalize?: boolean
    onSelect?: (value: string) => void
}

export default function SelectUI({
    name,
    content,
    isFilterBy = false,
    isLabel = false,
    selected,
    isCapitalize = false,
    onSelect,
}: SelectUIProps) {
    return (
        <div className="filterBy">
            {isFilterBy && (
                <p className="font-semibold md:font-medium mt-1">Filtrar por: </p>
            )}

            <Select
                value={selected ?? undefined}
                onValueChange={(val) => {
                    if (!onSelect) return
                    onSelect(val)
                }}
            >
                <SelectTrigger
                    className={`w-[180px] ${isCapitalize ? "capitalize" : ""}`}
                >
                    <SelectValue
                        placeholder={
                            isFilterBy || isLabel ? name : `Escolha um ${name}`
                        }
                    />
                </SelectTrigger>

                <SelectContent>
                    <SelectGroup>
                        {content.map((item, index) => (
                            <SelectItem
                                value={item}
                                key={index}
                                className={isCapitalize ? "capitalize" : ""}
                            >
                                {item}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    )
}
