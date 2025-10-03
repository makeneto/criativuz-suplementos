export default async function useProducts() {
    async function getProducts() {
        const res = await fetch("http://localhost:5000/api/products", {
            cache: "no-store",
        })
        if (!res.ok) {
            throw new Error("Falha ao buscar produtos")
        }
        return res.json()
    }
    const products = await getProducts()

    return products
}
