import { Checkbox } from "../ui/checkbox"
import { Label } from "../ui/label"

interface UserGoalsItemProps {
    goal: string
    checked: boolean
    onToggle: (goal: string) => void
    id: string
}

export default function UserGoalsItem({
    goal,
    checked,
    onToggle,
    id,
}: UserGoalsItemProps) {
    return (
        <div className="flex items-center gap-3">
            <Checkbox
                id={id}
                className="checkboxRed w-5 h-5"
                checked={checked}
                onCheckedChange={() => onToggle(goal)}
            />
            <Label htmlFor={id} className="text-[0.87rem] font-medium">
                {goal}
            </Label>
        </div>
    )
}
