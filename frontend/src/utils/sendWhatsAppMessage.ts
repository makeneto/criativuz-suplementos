import { WHATSAPP_NUMBER } from "@/constants/whatsappNumber"

interface SendWhatsAppMessageProps {
    product: string
    brand: string
    weight: string
    flavor: string
    price: string | number
    qtd: number
    total: string
    deliveryDate?: string
}

export function sendWhatsAppMessage({
    product,
    brand,
    weight,
    flavor,
    price,
    qtd,
    total,
    deliveryDate,
}: SendWhatsAppMessageProps) {
    const message = `
*ENCOMENDA - CRIATIVUZ SUPLEMENTOS*

Olá, gostaria de fazer uma encomenda com os seguintes detalhes:

*Produto:* ${product}
*Marca:* ${brand}
*Peso:* ${weight}
*Sabor:* ${flavor}
*Preço Unitário:* ${price}
*Quantidade:* ${qtd} Unidades

*Total:* ${total}
*Data de entrega:* ${deliveryDate}

Por favor, confirma a disponibilidade e o prazo de entrega.
Fico a aguardar o retorno.
`

    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`

    window.open(whatsappUrl, "_blank")
}
