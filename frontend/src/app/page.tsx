import BestSellers from "@/components/BestSellers"
import BrandsSection from "@/components/BrandsSection"
import GridCategory from "@/components/GridCategory"
import HeroSection from "@/components/HeroSection"

export default async function Home() {
    return (
        <>
            <HeroSection />
            <BrandsSection />
            <BestSellers />
            <GridCategory />
        </>
    )
}
