"use client"

import { Checkbox } from "../ui/checkbox"
import { Label } from "../ui/label"

interface UserGoalsProps {
    selectedGoals: string[]
    onChange: (goals: string[]) => void
}

export const GOALS: Record<string, string[]> = {
    "Ganho de massa": ["ganho de massa", "proteína", "creatina", "BCAA"],
    "Perda de gordura": ["queima gordura", "suporte à saúde"],
    "Energia / Pré-treino": ["pré-treino", "creatina"],
    "Recuperação muscular": ["glutamina", "proteína"],
    "Saúde geral": ["suporte à saúde"],
    "Performance esportiva": ["creatina", "pré-treino"],
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
            {Object.keys(GOALS).map((goal, idx) => (
                <div key={idx} className="flex items-center gap-3">
                    <Checkbox
                        id={`goal-${idx}`}
                        className="checkboxRed w-5 h-5"
                        checked={selectedGoals.includes(goal)}
                        onCheckedChange={() => toggleGoal(goal)}
                    />
                    <Label
                        htmlFor={`goal-${idx}`}
                        className="text-[0.87rem] font-medium"
                    >
                        {goal}
                    </Label>
                </div>
            ))}
        </div>
    )
}
