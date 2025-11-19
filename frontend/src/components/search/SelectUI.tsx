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
    onSelect?: (value: string | null) => void
}

export default function SelectUI({
    name,
    content,
    isFilterBy = false,
    isLabel = false,
    selected,
    onSelect,
}: SelectUIProps) {
    return (
        <div className="filterBy">
            {isFilterBy && <p className="font-medium mt-1">Filtrar por: </p>}

            <Select
                value={selected ?? undefined}
                onValueChange={(val) => {
                    if (!onSelect) return
                    if (val === selected) {
                        onSelect(null)
                    } else {
                        onSelect(val)
                    }
                }}
            >
                <SelectTrigger className="w-[180px]">
                    <SelectValue
                        placeholder={
                            isFilterBy || isLabel ? name : `Escolha um ${name}`
                        }
                    />
                </SelectTrigger>

                <SelectContent>
                    <SelectGroup>
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
