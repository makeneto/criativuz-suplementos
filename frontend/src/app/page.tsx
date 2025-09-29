async function getProducts() {
    const res = await fetch("http://localhost:5000/api/products", {
        cache: "no-store",
    })
    if (!res.ok) {
        throw new Error("Falha ao buscar produtos")
    }
    return res.json()
}

export default async function Home() {
    const products = await getProducts()

    return (
        <main>
            <ul style={{ margin: "2rem" }}>
                {products.map((p: any) => (
                    <li key={p.id}>
                        {p.name} - Kz {p.price}
                    </li>
                ))}
            </ul>
        </main>
    )
}
