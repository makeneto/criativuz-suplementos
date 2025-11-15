function normalizePrice(value: any) {
    return Array.isArray(value) ? value : [value]
}

export function normalizeFavorite(item: any) {
    return {
        id: item.id,
        name: item.name,
        postImages: Array.isArray(item.postImages)
            ? item.postImages
            : [item.postImages || item.image],

        price: normalizePrice(item.price),
        discountPrice: normalizePrice(item.discountPrice ?? 0),
    }
}
