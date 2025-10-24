export const formatOrderDate = (date: Date) =>
    date.toLocaleDateString("pt-BR", {
        day: "numeric",
        month: "long",
    })
