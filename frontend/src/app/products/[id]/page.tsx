import useProducts from "@/hooks/useProducts"
import Image from "next/image"

interface ProductPageProps {
    params: {
        id: string
    }
}

export default async function ProductPage({ params }: ProductPageProps) {
    const supplements = await useProducts()
    const allProducts = supplements.products

    // Procurar o produto correspondente ao ID da rota
    const product = allProducts.find((p: any) => p.id === Number(params.id))

    if (!product) {
        return (
            <div className="text-center mt-20 text-xl text-gray-400">
                Produto não encontrado.
            </div>
        )
    }

    return (
        <section className="productPage text-zinc-100 w-4/5 mx-auto my-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row gap-10">
                <Image
                    src={product.postImages[0]}
                    alt={product.name}
                    width={400}
                    height={400}
                    className="rounded-2xl object-cover"
                />

                <div className="flex flex-col justify-center gap-3">
                    <h1 className="text-3xl font-bold">{product.name}</h1>
                    <h3 className="text-zinc-400 uppercase tracking-widest">
                        {product.brand}
                    </h3>
                    <p className="text-zinc-300 leading-relaxed">
                        {product.description.synopsis}
                    </p>
                    <p className="text-xl font-semibold text-emerald-400 mt-2">
                        {product.price[0].toLocaleString()} Kz
                    </p>

                    <div className="flex gap-2 mt-4 flex-wrap">
                        {product.flavours.map((flavour: string, i: number) => (
                            <span
                                key={i}
                                className="px-3 py-1 bg-zinc-800 rounded-full text-sm"
                            >
                                {flavour}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Detalhes */}
            <div className="mt-16 space-y-10">
                <div>
                    <h2 className="text-2xl font-semibold mb-3">Destaques</h2>
                    <ul className="list-disc pl-6 space-y-2 text-zinc-300">
                        {product.description.highlights.map(
                            (item: string, index: number) => (
                                <li key={index}>{item}</li>
                            )
                        )}
                    </ul>
                </div>

                <div>
                    <h2 className="text-2xl font-semibold mb-3">Informações</h2>
                    <p className="text-zinc-300 leading-relaxed">
                        {product.description.information}
                    </p>
                </div>

                {product.description.recommendedUse && (
                    <div>
                        <h2 className="text-2xl font-semibold mb-3">
                            Como usar
                        </h2>
                        <p className="text-zinc-300 leading-relaxed">
                            {product.description.recommendedUse}
                        </p>
                    </div>
                )}
            </div>
        </section>
    )
}
