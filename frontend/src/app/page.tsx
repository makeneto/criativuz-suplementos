import HeroSection from "@/components/HeroSection"
import BrandsSection from "@/components/BrandsSection"
import Steps from "@/components/Steps"
import BestSellers from "@/components/BestSellers"
import GridCategory from "@/components/GridCategory"
import AboutSection from "@/components/AboutSection"

export default async function Home() {
    return (
        <>
            <HeroSection />
            <BrandsSection />
            <AboutSection />
            <Steps />
            <BestSellers />
            <GridCategory />
        </>
    )
}
