import React from "react"

interface TestimonialItemProps {
    className: string
    children?: React.ReactNode
    message: string
    abbr: string
    author: string
    job: string
}

export default function TestimonialItem({
    className,
    children,
    message,
    abbr,
    author,
    job,
}: TestimonialItemProps) {
    return (
        <div className={`testimonials__item ${className}`}>
            {children}
            <h1 className="testimonials__text">“{message}”</h1>
            <article className="testimonials__author">
                <div className="testimonials__avatar">{abbr}</div>
                <div className="testimonials__info">
                    <h2 className="testimonials__name">{author}</h2>
                    <p className="testimonials__role">{job}</p>
                </div>
            </article>
        </div>
    )
}
