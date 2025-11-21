import {
    aboutLinks,
    categoryLinks,
    productLinks,
} from "@/constants/footerLinks"
import useProducts from "../product/useProducts"

export default function useFooter() {
    const { data, isPending } = useProducts()
    const currentYear = new Date().getFullYear()
    const brands = data?.brands || []

    const brandLinks = isPending
        ? [{ label: "Carregando marcas...", href: "#" }]
        : brands.map((brand: any) => ({
              label: brand.name,
              href: `/search?query=${encodeURIComponent(brand.name)}`,
          }))

    const columns = [
        { title: "Sobre nós", links: aboutLinks },
        { title: "Marcas", links: brandLinks },
        { title: "Produtos", links: productLinks },
        { title: "Categorias", links: categoryLinks },
    ]

    return { columns, currentYear }
}
