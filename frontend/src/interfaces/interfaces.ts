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
    flavors: string[]
    inStock: boolean
}

export interface ProductDescription {
    synopsis: string
    highlights: string[]
    information: string
    recommendedUse: string
}

export interface CartItemProps {
    id: string
    image: string
    name: string
    weight: string
    flavor: string
    category: string
    price: number
    discountPrice?: number
    quantity: number
}

export interface ProductActionsProps {
    qtd: number
    onAdd: () => void
    onSubtract: () => void
    deliveryDate?: Date
    setDeliveryDate: (date: Date | undefined) => void
    onOrder: (e: React.MouseEvent) => void
    onAddToCart: () => void
}

export interface ProductModalProps {
    product: {
        name: string
        brand: string
        description?: { synopsis?: string }
        postImages: string[]
        weight: string[]
        flavors: string[]
        id?: string
        _id?: string
        productId?: string
        product?: { id?: string }
    }
    setProduct: (value: any) => void
    buttonLabel: string
    onSubmit: (data: {
        product: any
        qtd: number
        weight: string
        flavor: string
    }) => void
}

export interface ModalActionsProps {
    isInCart: boolean
    handleAddClick: () => void
    handleOrder: () => void
    setProduct: (p: any) => void
    deliveryDate: Date | undefined
    setDeliveryDate: (d: Date | undefined) => void
    qtd: number
    onAdd: () => void
    onSubtract: () => void
}
