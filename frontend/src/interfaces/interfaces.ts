export interface ProductDescription {
    synopsis: string
    highlights: string[]
    information: string
    recommendedUse: string
}

export interface Product {
    id: number
    name: string
    price: number[]
    discountPrice: number[]
    weight: string[]
    category: string
    description: ProductDescription
    postImages: string[]
    bestSeller: boolean
    flavours: string[]
    inStock: boolean
}

export interface ProductsResponse {
    products: {
        all: Product[]
    }
}
