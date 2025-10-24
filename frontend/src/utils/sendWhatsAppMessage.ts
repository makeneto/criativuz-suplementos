export function sendWhatsAppMessage({
    phone,
    product,
    brand,
    weight,
    flavour,
    price,
    qtd,
    total,
    deliveryDate,
}: {
    phone: string
    product: string
    brand: string
    weight: string
    flavour: string
    price: string | number
    qtd: number
    total: string
    deliveryDate?: string
}) {
    const boxEmoji = "\u{1F4E6}"

    const message = `
${boxEmoji} *ENCOMENDA - CRIATIVUZ SUPLEMENTOS*

Olá, gostaria de fazer uma encomenda com os seguintes detalhes:

*Produto:* ${product}
*Marca:* ${brand}
*Peso:* ${weight}
*Sabor:* ${flavour}
*Preço Unitário:* ${price}
*Quantidade:* ${qtd} Unidades

*Total:* ${total}
*Data de entrega:* ${deliveryDate}

Por favor, confirma a disponibilidade e o prazo de entrega.
Fico a aguardar o retorno.
`

    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${phone}?text=${encodedMessage}`

    window.open(whatsappUrl, "_blank")
}
