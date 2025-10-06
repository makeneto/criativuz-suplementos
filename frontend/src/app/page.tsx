import BestSellers from "@/components/BestSellers"
import GridCategory from "@/components/GridCategory"
import Header from "@/components/Header"

export default async function Home() {
    return (
        <>
            <Header />
            <BestSellers />
            <GridCategory />
        </>
    )
}
