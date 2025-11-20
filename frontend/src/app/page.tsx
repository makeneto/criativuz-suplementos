import Hero from "@/components/sections/Hero"
import BrandsSection from "@/components/sections/BrandsSection"
import Steps from "@/components/sections/Steps"
import Gallery from "@/components/sections/Gallery"
import EndSection from "@/components/sections/EndSection"
import Bestsellers from "../components/sections/Bestsellers"
import AboutSection from "@/components/sections/AboutSection"
import Testimonials from "@/components/sections/Testimonials"

export default async function Home() {
    return (
        <>
            <Hero />
            <BrandsSection />
            <AboutSection />
            <Bestsellers />
            <Steps />
            <Gallery />
            <EndSection />
            <Testimonials />
        </>
    )
}
