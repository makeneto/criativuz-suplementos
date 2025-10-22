import { useQuery } from "@tanstack/react-query"

export default function useProducts() {
    const fetchProducts = async () => {
        const res = await fetch("http://localhost:5000/api/all", {
            cache: "no-store",
        })
        if (!res.ok) {
            throw new Error("Falha ao buscar produtos")
        }
        return res.json()
    }

    const {
        data,
        error,
        isPending,
        isFetching,
    } = useQuery({
        queryKey: ["products"],
        queryFn: fetchProducts,
        staleTime: 1000 * 60 * 5,
        retry: 2,
    })

    return { data, error, isPending, isFetching }
}
