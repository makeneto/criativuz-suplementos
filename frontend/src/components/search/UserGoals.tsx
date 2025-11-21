import { USER_GOALS } from "@/constants/userGoals"
import UserGoalsItem from "./UserGoalsItem"

interface UserGoalsProps {
    selectedGoals: string[]
    onChange: (goals: string[]) => void
}

export default function UserGoals({ selectedGoals, onChange }: UserGoalsProps) {
    const toggleGoal = (goal: string) => {
        if (selectedGoals.includes(goal)) {
            onChange(selectedGoals.filter((g) => g !== goal))
        } else {
            onChange([...selectedGoals, goal])
        }
    }

    return (
        <div className="grid gap-4">
            {Object.keys(USER_GOALS).map((goal, idx) => (
                <UserGoalsItem
                    key={idx}
                    id={`goal-${idx}`}
                    goal={goal}
                    checked={selectedGoals.includes(goal)}
                    onToggle={toggleGoal}
                />
            ))}
        </div>
    )
}
