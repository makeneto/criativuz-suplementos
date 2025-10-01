export const formatCurrency = (value: number): string => {
    return value.toLocaleString("pt-AO", {
        style: "currency",
        currency: "AOA",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })
}
