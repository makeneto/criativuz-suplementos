import HeroSection from "@/components/sections/HeroSection"
import BrandsSection from "@/components/brands/BrandsSection"
import Steps from "@/components/sections/Steps"
import Gallery from "@/components/sections/Gallery"
import EndSection from "@/components/sections/EndSection"
import Bestsellers from "../components/sections/Bestsellers"
import AboutSection from "@/components/sections/AboutSection"

export default async function Home() {
    return (
        <>
            <HeroSection />
            <BrandsSection />
            <AboutSection />
            <Bestsellers />
            <Steps />
            <Gallery />
            <EndSection />
        </>
    )
}
