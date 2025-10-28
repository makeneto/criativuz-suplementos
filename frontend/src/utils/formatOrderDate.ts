export function formatOrderDate(date: Date) {
    if (!date) return ""

    const formatted = date.toLocaleDateString("pt-PT", {
        day: "numeric",
        month: "long",
    })

    return formatted.replace(
        / de ([a-z])/,
        (match, p1) => ` de ${p1.toUpperCase()}`
    )
}
