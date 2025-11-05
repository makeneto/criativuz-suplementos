"use client"

import * as React from "react"
import { Calendar1 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { formatOrderDate } from "@/utils/formatOrderDate"

interface Calendar22Props {
    date: Date | undefined
    setDate: (date: Date | undefined) => void
}

export function Calendar22({ date, setDate }: Calendar22Props) {
    const [open, setOpen] = React.useState(false)

    return (
        <div className="flex flex-col gap-2">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        id="date"
                        className="w-48 justify-between text-base font-normal"
                    >
                        {date ? formatOrderDate(date) : "Data de entrega"}
                        <Calendar1 className="text-zinc-600" />
                    </Button>
                </PopoverTrigger>

                <PopoverContent
                    className="z-[2000] w-auto overflow-hidden p-0"
                    align="start"
                >
                    <Calendar
                        mode="single"
                        selected={date}
                        captionLayout="dropdown"
                        onSelect={(date) => {
                            setDate(date)
                            setOpen(false)
                        }}
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}
