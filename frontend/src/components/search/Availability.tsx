"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export default function Availability() {
    return (
        <div className="flex flex-col gap-6">
            <Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-red-600 has-[[aria-checked=true]]:bg-red-50 dark:has-[[aria-checked=true]]:border-red-900 dark:has-[[aria-checked=true]]:bg-red-950">
                <Checkbox
                    id="toggle-2"
                    defaultChecked
                    disabled
                    className="data-[state=checked]:border-red-600 data-[state=checked]:bg-red-600 data-[state=checked]:text-white dark:data-[state=checked]:border-red-700 dark:data-[state=checked]:bg-red-700 disabled:opacity-1"
                />
                <div className="grid gap-1.5 font-normal">
                    <p className="text-sm leading-none font-medium">Em Stock</p>
                    <p className="text-muted-foreground text-sm">
                        Produtos prontos para envio imediato.
                    </p>
                </div>
            </Label>
            <div className="flex items-start gap-3">
                <Checkbox id="toggle" disabled />
                <Label htmlFor="toggle">Fora de Stock</Label>
            </div>
        </div>
    )
}
