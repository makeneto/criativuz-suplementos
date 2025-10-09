import BestSellers from "@/components/BestSellers"
import GridCategory from "@/components/GridCategory"
import HeroCarousel from "@/components/HeroCarousel"
import { slides } from "@/data/slides"

export default async function Home() {
    return (
        <>
            <HeroCarousel slides={slides} />
            <BestSellers />
            <GridCategory />
        </>
    )
}
