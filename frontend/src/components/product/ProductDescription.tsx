export default function ProductDescription({ text }: { text?: string }) {
    if (!text) return null

    return (
        <p className="productPage__container--content--description">{text}</p>
    )
}
