"use client"
import { Cardio } from "ldrs/react"
import "ldrs/react/Cardio.css"

export default function Loading() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-background">
            <Cardio size="50" stroke="4" speed="2" color="black" />
        </div>
    )
}
