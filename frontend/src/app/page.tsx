import HeroSection from "@/components/HeroSection"
import BrandsSection from "@/components/BrandsSection"
import Steps from "@/components/Steps"
import Bestsellers from "@/components/Bestsellers"
import AboutSection from "@/components/AboutSection"
import Gallery from "@/components/Gallery"
import EndSection from "@/components/EndSection"

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
