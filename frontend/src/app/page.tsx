import HeroSection from "@/components/HeroSection"
import BrandsSection from "@/components/BrandsSection"
import Steps from "@/components/Steps"
import AboutSection from "@/components/AboutSection"
import Gallery from "@/components/Gallery"
import EndSection from "@/components/EndSection"
import Bestsellers from "../components/Bestsellers"

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
